import CustomPressable from '@/components/common/custom-pressable'
import { Text } from '@/components/common/global-text'
import { profileData } from '@/data/profile/profile.data'
import useTheme from '@/hooks/use-theme'
import { useAuth } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ActivityIndicator, Switch, View } from 'react-native'
import Toast from 'react-native-toast-message'

const Settings = () => {
   const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
   const { signOut } = useAuth();
   const { colors, isDarkMode, toggleDarkMode } = useTheme();

   const appearance = profileData.settings.appearance;
   const settings = profileData.settings.otherSettings;

   const handleSignOut = async () => {
      try {
         setIsSigningOut(true);
         await signOut();

         Toast.show({
            type: 'success',
            text1: 'Signed Out',
            text2: 'Successfully signed out'
         });
      } catch (error) {
         let message = 'Unknown error';
         if (error instanceof Error) message = error.message;
         else if (typeof error === 'string') message = error;

         Toast.show({
            type: 'error',
            text1: 'Problem Singing Out',
            text2: message
         });
      } finally {
         setIsSigningOut(false);
      }
   }

   return (
      <View className='px-4 mt-5 gap-5 pb-20'>

         {/* Appearance */}
         <View>
            <Text className='text-xl font-interSemiBold'>{appearance.header}</Text>
            <View className='p-[12px] mt-3 rounded-2xl bg-surface-secondary flex-row items-center justify-between'>
               <View className='flex-row gap-4 items-center'>
                  <View
                     className='h-12 w-12 rounded-xl bg-surface-tertiary flex items-center justify-center'
                     style={{ backgroundColor: appearance.appearanceContent.bgColor }}
                  >
                     <Ionicons
                        name="sunny-outline"
                        size={26}
                        color={appearance.appearanceContent.iconColor}
                     />
                  </View>
                  <Text className='text-[15px] font-interSemiBold'>{appearance.appearanceContent.title}</Text>
               </View>
               <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
               />
            </View>
         </View>

         {/* Other Settings */}
         <View>
            <Text className='text-xl font-interSemiBold'>{settings.header}</Text>
            <View className='p-[12px] mt-3 rounded-2xl bg-surface-secondary flex-row items-center justify-between'>
               <View className='flex-row gap-4 items-center'>
                  <View
                     className='h-12 w-12 rounded-xl bg-surface-tertiary flex items-center justify-center'
                     style={{ backgroundColor: settings.notificationContent.bgColor }}
                  >
                     <Ionicons
                        name="notifications-outline"
                        size={26}
                        color={settings.notificationContent.iconColor}
                     />
                  </View>
                  <Text className='text-[15px] font-interSemiBold'>{settings.notificationContent.title}</Text>
               </View>
               <Ionicons name="chevron-forward" size={24} color={colors.text.primary} />
            </View>
            <View className='p-[12px] mt-3 rounded-2xl bg-surface-secondary flex-row items-center justify-between'>
               <View className='flex-row gap-4 items-center'>
                  <View
                     className='h-12 w-12 rounded-xl bg-surface-tertiary flex items-center justify-center'
                     style={{ backgroundColor: settings.profileContent.bgColor }}
                  >
                     <Ionicons
                        name="person-outline"
                        size={26}
                        color={settings.profileContent.iconColor}
                     />
                  </View>
                  <Text className='text-[15px] font-interSemiBold'>{settings.profileContent.title}</Text>
               </View>
               <Ionicons name="chevron-forward" size={24} color={colors.text.primary} />
            </View>
         </View>

         {/* Sign Out Button */}
         <CustomPressable
            onPress={handleSignOut}
            className='mt-4 bg-red-500/10 border border-red-500/50'
            disabled={isSigningOut}
         >
            {
               isSigningOut ? (
                  <ActivityIndicator size={24} color='red' />
               ) : (
                  <Text className='text-[15px] font-interSemiBold text-red-500'>Sign Out</Text>
               )
            }
         </CustomPressable>

      </View>
   )
}

export default Settings