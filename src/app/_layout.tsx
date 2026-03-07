import CustomStatusBar from "@/components/common/custom-status-bar";
import { Stack } from "expo-router";
import FontProvider from "../components/providers/font-provider";
import { ThemeProvider } from "../components/providers/theme-provider";
import "../css/global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FontProvider>
        <CustomStatusBar />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FontProvider>
    </ThemeProvider>
  );
}
