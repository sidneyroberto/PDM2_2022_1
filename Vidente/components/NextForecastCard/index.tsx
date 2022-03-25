import { getWeatherIconUri } from '../../assets/weather'
import Forecast from '../../models/Forecast'
import {
  Card,
  WeatherDescription,
  WeatherIcon,
  WeatherTemperature,
} from './styles'

type Props = {
  weather: Forecast
}

const NextTemperature = ({ weather }: Props) => {
  return (
    <Card>
      <WeatherIcon source={getWeatherIconUri(weather.iconNumber)} />
      <WeatherDescription>
        {weather.time} | {weather.description}
      </WeatherDescription>
      <WeatherTemperature>{weather.temperature}°C</WeatherTemperature>
    </Card>
  )
}

export default NextTemperature
