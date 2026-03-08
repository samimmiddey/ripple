import { cn } from '@/lib/cn'
import { ReactNode } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'

interface CustomPressableProps {
   onPress?: () => void
   disabled?: boolean
   style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>)
   className?: string
   children?: ReactNode
}

const CustomPressable = (
   {
      onPress,
      disabled = false,
      style,
      className,
      children,
   }: CustomPressableProps
) => {
   return (
      <Pressable
         onPress={onPress}
         disabled={disabled}
         style={style}
         className={cn(
            'px-6 py-4 bg-brand-primary rounded-xl flex-row items-center justify-center gap-2',
            className
         )}
      >
         {children}
      </Pressable>
   )
}

export default CustomPressable