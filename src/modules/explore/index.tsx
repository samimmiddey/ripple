import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import Header from './components/header'
import SearchComponent from './components/search-component'

const Explore = () => {
   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <View className='flex-1 mt-2'>
            <Header />
            <SearchComponent />
         </View>
      </TouchableWithoutFeedback>
   )
}

export default Explore