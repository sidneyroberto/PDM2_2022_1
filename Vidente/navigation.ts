import Forecast from './models/Forecast'

export type RootStackParamList = {
  Home: undefined
  NextForecasts: { nextForecasts: Forecast[] }
  Config: undefined
}
