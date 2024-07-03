import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import Button from './components/button';
import { NavigationContainer} from '@react-navigation/native';
import Navigation from './naviagtion';
import  { ThemeProvider } from '@shopify/restyle';
import { theme } from './utils/theme';




export default function App() {
  return (
    <NavigationContainer>
    <ThemeProvider theme={theme}>
      
      <Navigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}




