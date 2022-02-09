import { Container, Image, Label, Price } from "./styles"

type Props = {
  label: string
  imgUrl: string
  price: number
  priceChange: number
}

const priceIncreasedStyle = {
  color: '#26c281'
}

const priceDecreasedStyle = {
  color: '#ff4c30'
}

const CryptoCard = ({ label, imgUrl, price, priceChange }: Props) => {
  return (
    <Container>
      <Image source={{ uri: imgUrl }} />
      <Label>{label}</Label>
      <Price style={priceChange > 0 ? priceIncreasedStyle : priceDecreasedStyle}>U$ {price}</Price>
    </Container>
  )
}

export default CryptoCard