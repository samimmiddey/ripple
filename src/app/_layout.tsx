import CustomStatusBar from "@/components/common/custom-status-bar";
import ToastProvider from "@/components/providers/toast-provider";
import QueryProvider from "@/config/query.config";
import ChatWrapper from "@/stream/components/chat-wrapper";
import { AppProvider } from "@/stream/context/app-context";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontProvider from "../components/providers/font-provider";
import { ThemeProvider } from "../context/theme-context";
import "../css/global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

export default function RootLayout() {
  if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryProvider>
        <ThemeProvider>
          <FontProvider>
            <GestureHandlerRootView className="flex-1 bg-surface-primary">
              <ChatWrapper>
                <AppProvider>
                  <CustomStatusBar />
                  <RootNavigator />
                  <ToastProvider />
                </AppProvider>
              </ChatWrapper>
            </GestureHandlerRootView>
          </FontProvider>
        </ThemeProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}

function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
