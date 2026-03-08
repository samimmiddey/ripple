import CustomStatusBar from "@/components/common/custom-status-bar";
import ToastProvider from "@/components/providers/toast-provider";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from "expo-router";
import { View } from "react-native";
import FontProvider from "../components/providers/font-provider";
import { ThemeProvider } from "../components/providers/theme-provider";
import "../css/global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

export default function RootLayout() {
  if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider>
        <FontProvider>
          <CustomStatusBar />
          <RootNavigator />
          <ToastProvider />
        </FontProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

function RootNavigator() {
  return (
    <View className="flex-1 bg-surface-primary">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
