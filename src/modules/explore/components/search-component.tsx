import CustomInput from '@/components/common/custom-input';
import FullScreenLoader from '@/components/common/full-screen-loader';
import { Text } from '@/components/common/global-text';
import ListEmptyText from '@/components/common/list-empty-text';
import { FETCH_ALL_USERS } from '@/constants/query-keys';
import useAppContext from '@/hooks/use-app-context';
import useTheme from '@/hooks/use-theme';
import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, View } from 'react-native';
import { useChatContext } from 'stream-chat-expo';

interface UserItem {
	id: string;
	name?: string | null;
	image?: string | null;
	online?: boolean;
};

const SearchComponent = () => {
	const [isCreating, setIsCreating] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [inputValue, setInputValue] = useState('');

	const debouncedSearch = useMemo(
		() => debounce((text: string) => {
			setSearchTerm(text.trim());
		}, 500),
		[]
	);

	const { setChannel } = useAppContext();
	const { user } = useUser();
	const { client } = useChatContext();
	const { colors } = useTheme();

	const router = useRouter();

	// Fetch users
	const { data: users = [], isLoading, isError, error } = useQuery<UserItem[]>({
		queryKey: [FETCH_ALL_USERS, client.userID, searchTerm],
		queryFn: async (): Promise<UserItem[]> => {
			const filters: any = {
				id: { $nin: [user?.id] },
				role: { $nin: ["admin"] },
			};

			// Add search filter only if search exists
			if (searchTerm.trim().length > 0) {
				filters.name = { $autocomplete: searchTerm };
			}

			const res = await client.queryUsers(
				filters,
				{ last_active: -1 },
				{ limit: 10 }
			);

			return res.users.map(user => ({
				id: user.id,
				name: user.name,
				image: user.image,
				online: user.online
			}));
		},
		enabled: !!user?.id && searchTerm.length > 0,
		staleTime: 0,
		gcTime: 0
	});

	// Start chat
	const handleStartChat = async (targetId: string) => {
		if (!user) return;

		try {
			setIsCreating(targetId);
			const channel = client.channel('messaging', {
				members: [user.id, targetId],
			});
			await channel.watch();
			setChannel(channel);
			// router.push(`/channels/${channel.id}`);
		} catch (error) {
			Alert.alert('Error', 'Could not create chat. Please try again.');
		} {
			setIsCreating(null);
		}
	}

	// 
	useEffect(() => {
		return () => debouncedSearch.cancel();
	}, [debouncedSearch]);

	// Error state
	if (isError) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text className='text-sm text-center text-red-500 font-interMedium'>
					{error?.message ?? "Something went wrong. Please try again later!"}
				</Text>
			</View>
		)
	}

	return (
		<View className='px-4 mt-4 flex-1'>
			<CustomInput
				value={inputValue}
				placeholder='Search users...'
				placeholderTextColor={colors.text.muted}
				onChangeText={text => {
					setInputValue(text);
					debouncedSearch(text)
				}
				}
				type='default'
			/>
			<View className='mt-4 flex-1'>
				{
					isLoading ? (
						<FullScreenLoader text='Loading users...' />
					) : (
						users.length === 0 ? (
							<ListEmptyText
								title='No users found'
								body='Try searching for a different name'
							>
								<Ionicons name='search-outline' size={100} color={colors.text.muted} />
							</ListEmptyText>
						) : (
							<FlatList
								data={users}
								keyExtractor={item => item.id}
								renderItem={({ item }) => (
									<Pressable
										onPress={() => handleStartChat(item.id)}
										className='flex-row items-center gap-3 mt-3 p-4 rounded-xl bg-surface-secondary'
									>
										<View className='w-14 h-14 rounded-full bg-surface-secondary items-center justify-center relative'>
											{
												item.image ? (
													<Image
														source={{ uri: item.image }}
														className='h-full w-full rounded-full'
													/>
												) : (
													<Ionicons name="person-sharp" size={30} color={colors.text.muted} />
												)
											}

											{item.online && <View className='h-4 w-4 rounded-full bg-green-600 absolute bottom-[3px] right-[-4px] z-[99] border-2 border-border-secondary' />}
										</View>
										<View className='flex-1'>
											<Text className='text-text-primary text-[16px] font-interSemiBold'>{item.name}</Text>
										</View>
										<View className='h-10 w-10 rounded-xl bg-surface-muted items-center justify-center'>
											{
												isCreating === item.id ? (
													<ActivityIndicator size={20} color={colors.text.secondary} />
												) : (
													<Ionicons
														name='chatbox-ellipses-outline'
														size={22}
														color={colors.text.secondary}
													/>
												)
											}
										</View>
									</Pressable>
								)}
							/>
						)
					)
				}
			</View>
		</View>
	)
}

export default SearchComponent