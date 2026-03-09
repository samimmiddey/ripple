import serverError from "@/utils/server-error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, QueryClientProvider, focusManager, onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { AxiosError } from "axios";
import { AppState, AppStateStatus, Platform } from "react-native";
import Toast from "react-native-toast-message";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: (failureCount, error: unknown) => {
            if (error instanceof AxiosError) {
               const status = error.response?.status ?? 0;
               // Don't retry on auth errors
               if ([401, 403].includes(status)) return false;
            }
            // Retry up to 3 times otherwise
            return failureCount < 3;
         },
         staleTime: 1000 * 60 * 10,
         gcTime: 1000 * 60 * 60 * 24 * 2,
         refetchOnWindowFocus: false,
         refetchOnReconnect: true,
      },
      mutations: {
         retry: 1,
         onError: (error) => {
            serverError(error)

            if (error instanceof AxiosError) {
               if (error.response?.status === 304) {
                  Toast.show({
                     type: 'error',
                     text1: 'Not Modified',
                     text2: 'No changes were made'
                  })
               }
            }
         }
      }
   }
});

// Persist queries to AsyncStorage (offline support)
let persister: any = null;

if (Platform.OS !== "web") {
   persister = createAsyncStoragePersister({
      storage: AsyncStorage,
      key: "myapp-query-cache-v1",
      throttleTime: 2000,
   });
}

// Setup focus & online listeners (run once)
if (Platform.OS !== "web") {
   // Focus management
   const onAppStateChange = (status: AppStateStatus) => {
      focusManager.setFocused(status === "active");
   };

   AppState.addEventListener("change", onAppStateChange);

   // Online status with NetInfo
   onlineManager.setEventListener((setOnline) => {
      const unsubscribe = NetInfo.addEventListener((state) => {
         setOnline(!!state.isConnected);
      });

      return unsubscribe;
   });
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
   if (Platform.OS === "web" || !persister) {
      // Fallback for web (no persistence)
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
   }

   return (
      <PersistQueryClientProvider
         client={queryClient}
         persistOptions={{
            persister,
            maxAge: 1000 * 60 * 60 * 24
         }}
      >
         {children}
      </PersistQueryClientProvider>
   );
}