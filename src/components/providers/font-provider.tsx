import {
   Inter_400Regular,
   Inter_400Regular_Italic,
   Inter_500Medium,
   Inter_500Medium_Italic,
   Inter_600SemiBold,
   Inter_600SemiBold_Italic,
   Inter_700Bold,
   Inter_700Bold_Italic,
   useFonts
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const FontProvider = ({ children }: { children: React.ReactNode }) => {
   const [loaded, error] = useFonts({
      regular: Inter_400Regular,
      regularItalic: Inter_400Regular_Italic,
      medium: Inter_500Medium,
      mediumItalic: Inter_500Medium_Italic,
      semiBold: Inter_600SemiBold,
      semiBoldItalic: Inter_600SemiBold_Italic,
      bold: Inter_700Bold,
      boldItalic: Inter_700Bold_Italic,
   });

   useEffect(() => {
      if (loaded || error) {
         SplashScreen.hideAsync();
      }
   }, [loaded, error]);

   if (!loaded && !error) {
      return null;
   }

   return children;
}

export default FontProvider