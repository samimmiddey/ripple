import { Text } from '@/components/common/global-text';
import useTheme from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

const TabsLayout = () => {
   const { colors } = useTheme();

   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textGray,
            tabBarStyle: {
               backgroundColor: colors.primaryBg,
               borderTopWidth: 1,
               borderTopColor: colors.border,
               height: 96,
               paddingBottom: 20,
               paddingTop: 13,
            },
            tabBarLabelStyle: {
               fontSize: 14,
               fontWeight: 600
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'Chats',
               tabBarIcon: ({ color, focused }) => (
                  <View
                     className='h-9 w-20 mb-2 flex items-center justify-center rounded-full'
                     style={{
                        backgroundColor: focused ? colors.tertiaryBg : 'transparent',
                     }}
                  >
                     <Ionicons name="chatbubbles-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.primary : colors.textGray
                     }}
                  >
                     Chats
                  </Text>
               ),
            }}
         />
         <Tabs.Screen
            name="explore"
            options={{
               title: 'Explore',
               tabBarIcon: ({ color, focused }) => (
                  <View
                     className='h-9 w-20 mb-2 flex items-center justify-center rounded-full'
                     style={{
                        backgroundColor: focused ? colors.tertiaryBg : 'transparent',
                     }}
                  >
                     <Ionicons name="compass-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.primary : colors.textGray
                     }}
                  >
                     Explore
                  </Text>
               ),
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               title: 'Profile',
               tabBarIcon: ({ color, focused }) => (
                  <View
                     className='h-9 w-20 mb-2 flex items-center justify-center rounded-full'
                     style={{
                        backgroundColor: focused ? colors.tertiaryBg : 'transparent',
                     }}
                  >
                     <Ionicons name="person-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.primary : colors.textGray
                     }}
                  >
                     Profile
                  </Text>
               ),
            }}
         />
      </Tabs>
   )
}

export default TabsLayout