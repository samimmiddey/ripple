import CustomPressable from '@/components/common/custom-pressable';
import useTheme from '@/hooks/use-theme';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthHomeScreen = () => {
   const { isDarkMode } = useTheme();

   return (
      <>
         <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            translucent
            backgroundColor="transparent"
         />
         <SafeAreaView className="flex-1 relative bg-surface-primary justify-between gap-3">
            <View className='mt-12 px-5 items-center'>
               <Image
                  source={require('@/assets/images/logo.png')}
                  className='h-28 w-28 mb-2'
                  resizeMode='contain'
               />
               <Text className="text-4xl font-interBold text-text-primary mb-3 text-center">Ripple!</Text>
               <Text className="text-[16px] text-text-secondary text-center">
                  Sign in or create an account to get started
               </Text>
            </View>
            <View className='h-[300px] w-full px-5 items-center justify-center'>
               <Image
                  source={require('@/assets/images/welcome.png')}
                  className='w-full h-full'
                  resizeMode='contain'
               />
            </View>
            <View className="w-full px-6 rounded-t-3xl">
               <View className='mt-8 gap-5'>
                  <Link href="/sign-in" asChild>
                     <CustomPressable className='rounded-[30px]'>
                        <Text className='text-[15px] font-interMedium text-text-inverse'>
                           Get Started
                        </Text>
                     </CustomPressable>
                  </Link>
               </View>
               <Text className='text-center my-8 text-[14px] text-text-primary'>
                  By using Ripple you agree to the <Text className='text-brand-primary font-interSemiBold'>terms</Text> and <Text className='text-brand-primary font-interSemiBold'>privacy policies</Text>
               </Text>
            </View>
         </SafeAreaView>
      </>
   )
}

export default AuthHomeScreen