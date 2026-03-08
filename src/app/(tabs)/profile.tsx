import Profile from '@/modules/profile'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
   return (
      <SafeAreaView edges={['top']} className="flex-1 bg-surface-primary">
         <Profile />
      </SafeAreaView>
   )
}

export default ProfileScreen