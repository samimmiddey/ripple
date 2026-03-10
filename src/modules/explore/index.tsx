import { View } from 'react-native'
import Header from './components/header'
import SearchComponent from './components/search-component'

const Explore = () => {
   return (
      <View className='flex-1 mt-2'>
         <Header />
         <SearchComponent />
      </View>
   )
}

export default Explore