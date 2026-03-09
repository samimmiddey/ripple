import { Text } from "@/components/common/global-text";
import { USER_SUGGESTIONS } from "@/constants/query-keys";
import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { useChatContext } from "stream-chat-expo";

export default function UserSuggestions() {
   const { colors } = useTheme();
   const { client } = useChatContext();

   const filters = {
      id: { $ne: client.userID }
   } as any;

   const { data: users = [], isLoading } = useQuery({
      queryKey: [USER_SUGGESTIONS, client.userID],
      queryFn: async () => {
         const res = await client.queryUsers(
            filters,
            { last_active: -1 },
            { limit: 10 }
         );

         return res.users.map(user => ({
            id: user.id,
            name: user.name,
            image: user.image
         }));
      },
      enabled: !!client?.userID
   });

   return (
      <View className="mt-6">
         <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
               <Link href='/explore'>
                  <View>
                     <View
                        style={{ ...styles.card, borderStyle: 'dashed' }}
                        className="border border-border-primary items-center justify-center mx-5"
                     >
                        <Ionicons name="add" size={30} color={colors.text.secondary} />
                     </View>
                     <Text
                        className="text-text-primary text-center mt-1 font-interMedium"
                        style={{ fontSize: 13 }}
                     >
                        New Chat
                     </Text>
                  </View>
               </Link>
            )}
            renderItem={({ item }) => (
               isLoading ? (
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
               ) : (
                  users &&
                  <View style={styles.cardContainer}>
                     <View style={styles.card} className="bg-surface-secondary items-center justify-center">
                        {
                           item.image ? (
                              <Image
                                 source={{ uri: item.image }}
                                 style={styles.image}
                              />
                           ) : (
                              <Ionicons name="person-sharp" size={30} color={colors.text.muted} />
                           )
                        }
                     </View>
                     <Text
                        className="text-text-primary text-center mt-1 font-interMedium"
                        style={{ fontSize: 13 }}
                     >
                        {item?.name?.split(" ")[0] ?? 'User'}
                     </Text>
                  </View>
               )
            )}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   cardContainer: {
      marginRight: 16
   },
   card: {
      width: 62,
      height: 62,
      borderRadius: '100%',
      overflow: "hidden",
   },
   image: {
      width: "100%",
      height: '100%',
   },
});