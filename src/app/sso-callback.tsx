import FullScreenLoader from '@/components/common/full-screen-loader';
import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function SSOCallback() {
   const { isLoaded, isSignedIn } = useAuth();
   const [waiting, setWaiting] = useState(true);

   useEffect(() => {
      if (!isLoaded) return;

      const timer = setTimeout(() => {
         setWaiting(false);
      }, 2000);

      return () => clearTimeout(timer);
   }, [isLoaded]);

   if (!isLoaded || waiting) {
      return (
         <FullScreenLoader text='Completing login...' />
      );
   }

   // If signed in, redirect to home
   if (isSignedIn) {
      return <Redirect href="/" />;
   }

   // Only now redirect to sign-in if still not signed in after waiting
   return <Redirect href="/(auth)/sign-in" />;
}