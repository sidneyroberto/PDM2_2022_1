import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 0 10px;
`

export const CityName = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 30px;
  margin: 10px 0;
  text-align: center;
`

export const WeatherInfoArea = styled.View`
  padding: 10px;
  border: 5px dashed #00b5cc;
  width: 300px;
  height: 300px;
  margin: 10px auto;
  border-radius: 150px;
  justify-content: center;
`

export const WeatherImage = styled.Image`
  margin: 0 auto;
  width: 100px;
  height: 100px;
`

export const CurrentTemperature = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 50px;
  text-align: center;
  color: #00b5cc;
`

export const WeatherDescription = styled.Text`
  font-family: 'Nunito_700Bold';
  font-size: 16px;
  text-align: center;
`

export const OtherTemperatures = styled.Text`
  font-family: 'Nunito_400Regular';
  font-size: 14px;
  text-align: center;
`
