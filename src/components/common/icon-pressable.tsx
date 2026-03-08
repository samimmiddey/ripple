import useTheme from '@/hooks/use-theme';
import { Pressable } from 'react-native';

const IconPressable = ({ children }: { children: React.ReactNode }) => {
   const { colors } = useTheme();

   return (
      <Pressable
         className="h-8 w-8 rounded-full items-center justify-center"
         style={({ pressed }) => [
            pressed && { backgroundColor: colors.surface.muted + '30', }
         ]}
         android_ripple={{
            color: colors.surface.muted + '30',
            borderless: true,
            foreground: true
         }}
      >
         {children}
      </Pressable>
   )
}

export default IconPressable