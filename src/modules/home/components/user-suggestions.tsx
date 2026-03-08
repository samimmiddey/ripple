import { Text } from "@/components/common/global-text";
import { homeData } from "@/data/home/home.data";
import useTheme from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, View } from "react-native";

export default function UserSuggestions() {
   const { colors } = useTheme();

   return (
      <View className="mt-6">
         <FlatList
            data={homeData.slider}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
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
            )}
            renderItem={({ item }) => (
               <View style={styles.cardContainer}>
                  <View style={styles.card}>
                     <Image source={item.img} style={styles.image} />
                  </View>
                  <Text
                     className="text-text-primary text-center mt-1 font-interMedium"
                     style={{ fontSize: 13 }}
                  >
                     {item.name.split(" ")[0]}
                  </Text>
               </View>
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