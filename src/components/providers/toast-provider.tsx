import useTheme from '@/hooks/use-theme'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Text } from '../common/global-text'

const ToastProvider = () => {
   const { colors } = useTheme();

   return (
      <Toast
         position='top'
         topOffset={60}
         visibilityTime={5000}
         config={{
            success: ({ text1, text2 }) => (
               <View
                  style={{
                     height: 70,
                     backgroundColor: '#4CAF50',
                     paddingHorizontal: 15,
                     justifyContent: 'center',
                     borderRadius: 10,
                     width: '90%',
                     boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                  }}
               >
                  <Text style={{ color: colors.text.inverse, fontSize: 16, fontWeight: 'bold' }}>
                     {text1}
                  </Text>
                  {text2 && (
                     <Text style={{ color: colors.text.inverse, fontSize: 14 }}>
                        {text2}
                     </Text>
                  )}
               </View>
            ),
            error: ({ text1, text2 }) => (
               <View
                  style={{
                     height: 70,
                     backgroundColor: '#f44336',
                     paddingHorizontal: 15,
                     justifyContent: 'center',
                     borderRadius: 10,
                     width: '90%',
                     boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                  }}
               >
                  <Text style={{ color: colors.text.inverse, fontSize: 16, fontWeight: 'bold' }}>
                     {text1}
                  </Text>
                  {text2 && (
                     <Text style={{ color: colors.text.inverse, fontSize: 14 }}>
                        {text2}
                     </Text>
                  )}
               </View>
            ),
         }}
      />
   )
}

export default ToastProvider