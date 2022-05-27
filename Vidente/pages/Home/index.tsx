import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import Loading from '../../components/Loading'

import Resume from '../../components/Resume'
import { UserContext } from '../../context/UserContext'
import Forecast from '../../models/Forecast'
import { RootStackParamList } from '../../navigation'
import ForecastinService from '../../services/ForecastingService'
import {
  Container,
  NextForecastsArea,
  NextForecastsButton,
  NextForecastsText,
} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  const [nextForecasts, setNextForecasts] = useState<Forecast[]>([])
  const [currentForecast, setCurrentForecast] = useState<Forecast>({
    description: '',
    iconNumber: 0,
    temperature: 0,
    time: '',
  })
  const [maxTemperature, setMaxTemperature] = useState<number>(0)
  const [minTemperature, setMinTemperature] = useState<number>(0)
  const [areForecastsLoaded, setAreForecastsLoaded] = useState<boolean>(false)

  const forecastingService = new ForecastinService()

  const { cityCode, cityName } = useContext(UserContext)

  const loadForecasts = async () => {
    const forecasts = await forecastingService.getNextForecasts(cityCode)
    setNextForecasts(forecasts.length > 0 ? forecasts.slice(1) : forecasts)
    if (forecasts.length > 0) {
      setCurrentForecast(forecasts[0])
    }

    let max = Number.NEGATIVE_INFINITY,
      min = Number.POSITIVE_INFINITY

    forecasts.forEach((f) => {
      if (max < f.temperature) {
        max = f.temperature
      }

      if (min > f.temperature) {
        min = f.temperature
      }
    })

    setMaxTemperature(max)
    setMinTemperature(min)
    setAreForecastsLoaded(true)
  }

  useEffect(() => {
    loadForecasts()
  }, [cityCode])

  return (
    <Container>
      {areForecastsLoaded && (
        <View>
          <Resume
            cityName={cityName}
            currentTemperature={currentForecast.temperature}
            description={currentForecast.description}
            iconNumber={currentForecast.iconNumber}
            maxTemperature={maxTemperature}
            minTemperature={minTemperature}
          />
          <NextForecastsButton
            onPress={() => navigation.push('NextForecasts', { nextForecasts })}
          >
            <NextForecastsArea>
              <NextForecastsText>Próximas temperaturas</NextForecastsText>
            </NextForecastsArea>
          </NextForecastsButton>
        </View>
      )}

      {!areForecastsLoaded && <Loading />}
    </Container>
  )
}

export default Home
