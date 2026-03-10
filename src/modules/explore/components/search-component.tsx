import useAppContext from '@/hooks/use-app-context';
import { useUser } from '@clerk/expo';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useChatContext } from 'stream-chat-expo';

const SearchComponent = () => {
    const [isCreating, setIsCreating] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');

    const { setChannel } = useAppContext();
    const { user } = useUser();
    const { client } = useChatContext();

    const filters = {
        id: { $nin: client.userID }, role: { $nin: ["admin"] }
    } as any;

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['fetch-all-users', client.userID],
        queryFn: async () => {
            const res = await client.queryUsers(
                filters,
                { last_active: -1 },
                { limit: 10 }
            );

            return res.users.map(user => ({
                id: user.id,
                name: user.name,
                image: user.image
            }));
        },
        enabled: !!client?.userID
    });

    return (
        <View className='px-4 mt-4 flex-1'>
            <Text>SearchComponent</Text>
        </View>
    )
}

export default SearchComponent