import useTheme from '@/hooks/use-theme';
import { ActivityIndicator, View } from 'react-native';
import { Text } from './global-text';

const FullScreenLoader = ({ text }: { text?: string }) => {
   const { colors } = useTheme();

   return (
      <View className="flex-1 items-center justify-center gap-4 bg-surface-primary">
         <ActivityIndicator size={28} color={colors.brand.primary} />
         {text && <Text className="text-lg font-interMedium">{text}</Text>}
      </View>
   )
}

export default FullScreenLoader