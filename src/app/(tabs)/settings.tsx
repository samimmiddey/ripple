import Settings from '@/modules/settings'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsScreen = () => {
   return (
      <SafeAreaView edges={['top']} className="flex-1 bg-surface-primary">
         <Settings />
      </SafeAreaView>
   )
}

export default SettingsScreen