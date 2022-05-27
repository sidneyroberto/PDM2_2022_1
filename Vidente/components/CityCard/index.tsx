import { Card, CardContainer, CityName } from './styles'

type Props = {
  cityName: string
  cityState: string
  onPress: () => void
}

const CityCard = ({ cityName, cityState, onPress }: Props) => {
  return (
    <Card onPress={() => onPress()}>
      <CardContainer>
        <CityName>{`${cityName}-${cityState}`}</CityName>
      </CardContainer>
    </Card>
  )
}

export default CityCard
