import FullScreenLoader from '@/components/common/full-screen-loader';
import ListEmptyText from '@/components/common/list-empty-text';
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
               <ListEmptyText
                  title="Let's start chatting!"
                  body="Find a user to start a conversation"
               >
                  <Ionicons name="chatbubbles-outline" size={100} color={colors.text.muted} />
               </ListEmptyText>
            )}
         />
      </View>
   )
}

export default ChatList