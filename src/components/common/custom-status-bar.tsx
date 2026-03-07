import useTheme from '@/hooks/use-theme';
import { StatusBar } from 'react-native';

const CustomStatusBar = () => {
   const { isDarkMode } = useTheme();

   return (
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
   )
}

export default CustomStatusBar