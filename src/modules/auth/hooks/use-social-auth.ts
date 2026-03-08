import { useSSO } from '@clerk/expo';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useSocialAuth = () => {
   const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
   const { startSSOFlow } = useSSO();

   const handleSocialAuth = async (strategy: "oauth_google" | "oauth_facebook" | "oauth_github") => {
      if (loadingStrategy) return;

      setLoadingStrategy(strategy);

      try {
         const { createdSessionId, setActive } = await startSSOFlow({
            strategy,
         });

         if (!createdSessionId || !setActive) {
            const provider = strategy === 'oauth_google' ? 'Google' : strategy === 'oauth_facebook' ? 'Facebook' : 'GitHub';

            Toast.show({
               type: 'error',
               text1: `Error authenticating with ${provider}`,
               text2: 'Please try again.',
            });

            return;
         }

         await setActive({ session: createdSessionId });
      } catch (error: unknown) {
         let message = 'Unknown error';
         if (error instanceof Error) message = error.message;
         else if (typeof error === 'string') message = error;

         Toast.show({
            type: 'error',
            text1: 'Authentication Error',
            text2: message
         });
      } finally {
         setLoadingStrategy(null);
      }
   }

   return {
      loadingStrategy,
      handleSocialAuth
   }
}