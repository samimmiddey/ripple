import { Text } from "@/components/common/global-text";
import IconPressable from "@/components/common/icon-pressable";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const Header = () => {
   return (
      <View className="flex-row items-center justify-between gap-3 px-4">
         <Text className="text-[24px] font-interSemiBold text-zinc-900">Ripple</Text>
         <View className="flex-row items-center gap-3">
            <IconPressable>
               <Ionicons name="notifications-outline" size={25} />
            </IconPressable>
            <IconPressable>
               <Ionicons name="ellipsis-vertical" size={24} />
            </IconPressable>
         </View>
      </View>
   )
}

export default Header