import { Text } from "@/src/components/common/global-text";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="px-4 pt-1">
      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-3xl font-interMedium">Ripple</Text>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </View>
    </SafeAreaView>
  );
}
