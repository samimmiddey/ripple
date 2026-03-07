import { Stack } from "expo-router";
import FontProvider from "../components/providers/font-provider";
import "../css/global.css";

export default function RootLayout() {
  return (
    <FontProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </FontProvider>
  );
}
