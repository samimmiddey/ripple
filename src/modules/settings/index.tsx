import { ScrollView, View } from 'react-native';
import Header from './components/header';
import SettingsInfo from './components/settings-info';
import UserInfo from './components/user-info';

const Settings = () => {
   return (
      <View className='flex-1 mt-2'>
         <Header />
         <ScrollView className='flex-1'>
            <UserInfo />
            <SettingsInfo />
         </ScrollView>
      </View>
   )
}

export default Settings