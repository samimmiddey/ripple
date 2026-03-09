import FullScreenLoader from '@/components/common/full-screen-loader';
import { Text } from '@/components/common/global-text';
import useAppContext from '@/hooks/use-app-context';
import useTheme from '@/hooks/use-theme';
import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { ChannelList } from 'stream-chat-expo';

const ChatList = () => {
   const { user } = useUser();
   const { setChannel } = useAppContext();
   const { colors } = useTheme()

   // const router = useRouter();

   const filters = { members: { $in: [user?.id!] }, type: 'messaging' }

   return (
      <View className='px-4 mt-4 flex-1'>
         <ChannelList
            key={colors.brand.primary}
            filters={filters}
            options={{ state: true, watch: true }}
            sort={{ last_updated: -1 }}
            onSelect={(channel) => {
               setChannel(channel);
               // router.push(`/channels/${channel.id}`);
            }}
            additionalFlatListProps={{
               contentContainerStyle: {
                  flexGrow: 1,
                  paddingBottom: 20,
                  backgroundColor: colors.surface.primary
               }
            }}
            LoadingIndicator={() => <FullScreenLoader text='Loading chats...' />}
            EmptyStateIndicator={() => (
               <View className='flex-1 items-center justify-center gap-2'>
                  <Ionicons name="chatbubbles-outline" size={100} color={colors.text.muted} />
                  <Text className='text-text-primary text-xl font-interSemiBold mt-2'>Let's start chatting!</Text>
                  <Text className='text-text-secondary'>Find a user to start a conversation</Text>
               </View>
            )}
         />
      </View>
   )
}

export default ChatList