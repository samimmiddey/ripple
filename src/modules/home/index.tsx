import { View } from 'react-native'
import ChatList from './components/chat-list'
import Header from './components/header'
import UserSuggestions from './components/user-suggestions'

const Home = () => {
   return (
      <View className='flex-1 mt-2'>
         <Header />
         <UserSuggestions />
         <ChatList />
      </View>
   )
}

export default Home