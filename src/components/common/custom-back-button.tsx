import useTheme from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomBackButton() {
   const router = useRouter();
   const { colors } = useTheme();
   const insets = useSafeAreaInsets();

   return (
      <View
         style={{
            position: 'absolute',
            top: insets.top + 12,
            left: 20,
            zIndex: 10,
         }}
      >
         <Pressable
            onPress={() => router.back()}
            className="bg-surface-secondary h-12 w-12 items-center justify-center rounded-full shadow-md overflow-hidden"
            style={({ pressed }) => pressed && { opacity: 0.7 }}
            android_ripple={{
               color: colors.surface.muted + '30',
               borderless: false,
               foreground: true
            }}
         >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
         </Pressable>
      </View>
   );
}