import Home from "@/modules/home";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-surface-primary">
      <Home />
    </SafeAreaView>
  );
}
