import FullScreenLoader from "@/components/common/full-screen-loader";
import { Text } from "@/components/common/global-text";
import { SYNC_USER_TO_STREAM } from "@/constants/query-keys";
import { useUser } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { streamTokenProvider, syncUserToStream } from "../services/stream-services";

type UserResource = NonNullable<ReturnType<typeof useUser>["user"]>;

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

const ChatClientLoader = ({ children, user }: { children: React.ReactNode, user: UserResource }) => {
   const { isLoading, isError, error } = useQuery({
      queryKey: [SYNC_USER_TO_STREAM, user.id],
      queryFn: () => syncUserToStream(user.id, user.fullName ?? '', user.imageUrl!),
      enabled: !!user.id,
      retry: 1
   });

   if (isLoading) {
      return <FullScreenLoader text="Connecting..." />
   }

   if (isError) {
      return (
         <View className="flex-1 items-center justify-center gap-4 bg-surface-primary">
            <Text className="text-lg font-interMedium">
               {error instanceof Error ? error.message : "Something went wrong!"}
            </Text>
         </View>
      )
   }

   return (
      <ChatClient user={user}>
         {children}
      </ChatClient>
   )
}

const ChatClient = ({
   children,
   user,
}: {
   children: React.ReactNode
   user: UserResource
}) => {
   const client = useCreateChatClient({
      apiKey: STREAM_API_KEY,
      userData: {
         id: user.id,
         name:
            user.fullName ??
            user.username ??
            user.emailAddresses[0].emailAddress.split("@")[0] ??
            "Guest",
         image: user.imageUrl,
      },
      tokenOrProvider: async () => streamTokenProvider(user.id),
   });

   if (!client) {
      return <FullScreenLoader text="Connecting..." />;
   }

   return (
      <OverlayProvider>
         <Chat client={client}>
            {children}
         </Chat>
      </OverlayProvider>
   );
};

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
   const { user, isLoaded } = useUser();

   // If user is not loader
   if (!isLoaded) {
      return <FullScreenLoader text="Connecting..." />;
   }

   // If user does not exist
   if (!user) {
      return <>{children}</>
   }

   return (
      <ChatClientLoader user={user}>
         {children}
      </ChatClientLoader>
   )
}

export default ChatWrapper