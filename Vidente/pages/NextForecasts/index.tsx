import { NativeStackScreenProps } from '@react-navigation/native-stack'

import NextForecastCard from '../../components/NextForecastCard'
import { RootStackParamList } from '../../navigation'
import { Container, ScrollPanel } from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'NextForecasts'>

const NextTemperatures = ({ navigation, route }: Props) => {
  const { nextForecasts } = route.params

  return (
    <Container>
      <ScrollPanel>
        {nextForecasts.map((t) => (
          <NextForecastCard key={t.time} weather={t} />
        ))}
      </ScrollPanel>
    </Container>
  )
}

export default NextTemperatures
