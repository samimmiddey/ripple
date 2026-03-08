import { Text } from '@/components/common/global-text';
import { profileData } from '@/data/profile/profile.data';
import useTheme from '@/hooks/use-theme';
import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';

const UserInfo = () => {
   const { user } = useUser();
   const { colors } = useTheme();

   return (
      <View className='px-4 items-center justify-center gap-1 mt-8'>
         <Image
            className='w-28 h-28 rounded-full mb-3'
            source={
               user?.imageUrl
                  ? { uri: user.imageUrl }
                  : profileData.user.fallbackImg
            }
         />
         <Text className='text-xl font-interBold'>{user?.fullName ?? 'User'}</Text>
         <Text className='text-[15px] text-text-secondary'>{user?.primaryEmailAddress?.emailAddress ?? 'Null'}</Text>
         <View className='px-3 py-1 bg-green-600 rounded-full font-interMedium mt-[5px]'>
            {user?.primaryEmailAddress?.verification?.status === "verified"
               ? (
                  <View className='text-text-inverse flex-row items-center gap-1'>
                     <Ionicons name="checkmark-circle" size={16} color={colors.text.inverse} />
                     <Text className='text-text-inverse text-sm'>Email Verified</Text>
                  </View>
               )
               : "Email Not Verified"}
         </View>
         <View className="flex-row gap-3 mt-5">
            {
               profileData.stats.map((item, index) => (
                  <View
                     key={index}
                     className='flex-1 py-4 px-2 rounded-xl bg-surface-secondary items-center justify-center gap-1'
                     style={{ backgroundColor: item.bgColor }}
                  >
                     <Text className='font-interSemiBold text-2xl'>{item.count}</Text>
                     <Text className='text-text-secondary text-sm'>{item.title}</Text>
                  </View>
               ))
            }
         </View>
      </View>
   )
}

export default UserInfo