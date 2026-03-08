import { Text } from "@/components/common/global-text";
import IconPressable from "@/components/common/icon-pressable";
import HeaderLayout from "@/components/layouts/header-layout";
import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const Header = () => {
   const { colors } = useTheme();

   return (
      <HeaderLayout>
         <Text className="text-[24px] font-interSemiBold text-text-primary">Ripple</Text>
         <View className="flex-row items-center gap-3">
            <IconPressable>
               <Ionicons name="notifications-outline" size={25} color={colors.text.primary} />
            </IconPressable>
            <IconPressable>
               <Ionicons name="ellipsis-vertical" size={24} color={colors.text.primary} />
            </IconPressable>
         </View>
      </HeaderLayout>
   )
}

export default Header