import { ScrollView, View } from 'react-native';
import Header from './components/header';
import Settings from './components/settings';
import UserInfo from './components/user-info';

const Profile = () => {
   return (
      <View className='flex-1 mt-2'>
         <Header />
         <ScrollView className='flex-1'>
            <UserInfo />
            <Settings />
         </ScrollView>
      </View>
   )
}

export default Profile