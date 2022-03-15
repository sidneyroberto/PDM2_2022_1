import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
} from '@expo-google-fonts/montserrat'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'

import { RootStackParamList } from './navigation'
import CryptoCurrencies from './pages/CryptoCurrencies'
import CryptoDetails from './pages/CryptoDetails'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="CryptoCurrencies" 
          component={CryptoCurrencies} 
          options={{ title: "Crypto Currencies"}}/>
        <Stack.Screen
          name="CryptoDetails"
          component={CryptoDetails}
          options={({ route }) => ({ title: route.params.name })}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
