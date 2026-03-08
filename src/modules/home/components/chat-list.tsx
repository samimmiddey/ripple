import { Text } from '@/components/common/global-text'
import { homeData } from '@/data/home/home.data'
import { FlatList, Image, View } from 'react-native'

const ChatList = () => {
   return (
      <View className='px-4 mt-4 flex-1'>
         <FlatList
            data={homeData.chats}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
               <View className='flex-row gap-4 items-center mb-4 mt-3'>
                  <Image source={item.img} className='w-14 h-14 rounded-full' />
                  <View className='gap-[3px] flex-1'>
                     <Text numberOfLines={1} className='text-text-primary text-[16px] font-interSemiBold'>{item.name}</Text>
                     <Text numberOfLines={1} className='text-text-primary font-interRegular'>{item.lastMessage}</Text>
                  </View>
                  <View className='items-end gap-1'>
                     <Text className='text-text-primary font-interRegular text-sm'>{item.time}</Text>
                     {item.notificationCount > 0 && (
                        <View className='min-w-5 h-5 px-1 bg-primary rounded-full flex items-center justify-center bg-brand-primary'>
                           <Text className='text-text-inverse text-[11px] font-interRegular'>{item.notificationCount}</Text>
                        </View>
                     )}
                  </View>
               </View>
            )}
         />
      </View>
   )
}

export default ChatList