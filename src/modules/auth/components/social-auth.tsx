import { Text } from '@/components/common/global-text';
import useTheme from '@/hooks/use-theme';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import { useSocialAuth } from '../hooks/use-social-auth';

const SocialAuth = () => {
   const { loadingStrategy, handleSocialAuth } = useSocialAuth();
   const { colors } = useTheme();

   const isLoading = loadingStrategy !== null;

   return (
      <View className='mt-8'>
         <Text className='text-center text-text-secondary text-[14px] mb-4'>or sign in with</Text>
         <View className='flex-row gap-4 justify-center w-full'>
            <Pressable
               onPress={() => !isLoading && handleSocialAuth('oauth_google')}
               disabled={loadingStrategy === 'oauth_google'}
               className='h-[60px] w-[60px] rounded-2xl items-center justify-center bg-surface-secondary'
            >
               {
                  loadingStrategy === "oauth_google" ? (
                     <ActivityIndicator size={24} color={colors.surface.muted} />
                  ) : (
                     <Image
                        source={require('@/assets/images/social/google.png')}
                        className='w-9 h-9'
                     />
                  )
               }
            </Pressable>
            <Pressable
               onPress={() => !isLoading && handleSocialAuth('oauth_facebook')}
               disabled={loadingStrategy === 'oauth_facebook'}
               className='h-[60px] w-[60px] rounded-2xl items-center justify-center bg-surface-secondary'
            >
               {
                  loadingStrategy === "oauth_facebook" ? (
                     <ActivityIndicator size={24} color={colors.surface.muted} />
                  ) : (
                     <Image
                        source={require('@/assets/images/social/facebook.png')}
                        className='w-9 h-9'
                     />
                  )
               }
            </Pressable>
            <Pressable
               onPress={() => !isLoading && handleSocialAuth('oauth_github')}
               disabled={loadingStrategy === 'oauth_github'}
               className='h-[60px] w-[60px] rounded-2xl items-center justify-center bg-surface-secondary'
            >
               {
                  loadingStrategy === "oauth_github" ? (
                     <ActivityIndicator size={24} color={colors.surface.muted} />
                  ) : (
                     <Image
                        source={require('@/assets/images/social/github.png')}
                        className='w-9 h-9'
                     />
                  )
               }
            </Pressable>
         </View>
      </View >
   )
}

export default SocialAuth