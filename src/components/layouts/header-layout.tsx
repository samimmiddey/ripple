import { cn } from '@/lib/cn'
import { View } from 'react-native'

interface PropsType {
   children: React.ReactNode
   className?: string
}

const HeaderLayout = ({ children, className }: PropsType) => {
   return (
      <View className={cn("flex-row items-center justify-between gap-3 px-4", className)}>
         {children}
      </View>
   )
}

export default HeaderLayout