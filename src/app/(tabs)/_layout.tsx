import FullScreenLoader from '@/components/common/full-screen-loader';
import { Text } from '@/components/common/global-text';
import useTheme from '@/hooks/use-theme';
import { useAuth } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';

const TabsLayout = () => {
   const { colors } = useTheme();
   const { isSignedIn, isLoaded } = useAuth()

   if (!isLoaded) {
      return <FullScreenLoader />
   }

   if (!isSignedIn) {
      return <Redirect href="/(auth)/welcome" />
   }

   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.brand.primary,
            tabBarInactiveTintColor: colors.text.secondary,
            tabBarStyle: {
               backgroundColor: colors.surface.primary,
               borderTopWidth: 1,
               borderTopColor: colors.border.secondary,
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
                        backgroundColor: focused ? colors.surface.tertiary : 'transparent',
                     }}
                  >
                     <Ionicons name="chatbubbles-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.brand.primary : colors.text.secondary
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
                        backgroundColor: focused ? colors.surface.tertiary : 'transparent',
                     }}
                  >
                     <Ionicons name="compass-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.brand.primary : colors.text.secondary
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
                        backgroundColor: focused ? colors.surface.tertiary : 'transparent',
                     }}
                  >
                     <Ionicons name="person-outline" size={24} color={color} />
                  </View>
               ),
               tabBarLabel: ({ focused }) => (
                  <Text
                     className={`${focused ? 'font-interSemiBold' : 'font-interRegular'}`}
                     style={{
                        color: focused ? colors.brand.primary : colors.text.secondary
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