import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
} from '@expo-google-fonts/montserrat'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'

import CryptoCurrencies from './pages/CryptoCurrencies'

const Stack = createNativeStackNavigator()

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
        <Stack.Screen name="Cryptocurrencies" component={CryptoCurrencies} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
