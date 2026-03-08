import FullScreenLoader from '@/components/common/full-screen-loader'
import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
   const { isSignedIn, isLoaded } = useAuth()

   if (!isLoaded) {
      return <FullScreenLoader />
   }

   if (isSignedIn) {
      return <Redirect href={'/'} />
   }

   return (
      <Stack
         screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 250,
            presentation: 'card',
            gestureEnabled: true,
         }}
      >
         <Stack.Screen name="welcome" options={{ headerShown: false }} />
         <Stack.Screen name="sign-in" options={{ headerShown: false }} />
         <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
   )
}