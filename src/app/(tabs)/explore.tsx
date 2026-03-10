import Explore from '@/modules/explore'
import { SafeAreaView } from 'react-native-safe-area-context'

const ExploreScreen = () => {
   return (
      <SafeAreaView edges={['top']} className="flex-1 bg-surface-primary">
         <Explore />
      </SafeAreaView>
   )
}

export default ExploreScreen