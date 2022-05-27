import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from './navigation'
import Home from './pages/Home'
import Config from './pages/Config'
import NextForecasts from './pages/NextForecasts'
import { TouchableOpacity } from 'react-native'
import ConfigButton from './components/ConfigButton'
import { UserContext, UserContextProvider } from './context/UserContext'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            contentStyle: { backgroundColor: '#fff' },
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
            options={({ navigation }) => ({
              title: 'Vidente',
              headerRight: () => (
                <ConfigButton onPress={() => navigation.navigate('Config')} />
              ),
            })}
          />
          <Stack.Screen
            name='NextForecasts'
            component={NextForecasts}
            options={{ title: 'Próximas Temperaturas' }}
          />
          <Stack.Screen
            name='Config'
            component={Config}
            options={{ title: 'Configurações' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  )
}

export default App
