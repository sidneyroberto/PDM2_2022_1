import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px 10px;
`

export const DetailsPanel = styled.View`
  background-color: #f1e7fe;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  margin: 15px auto;
`

export const PanelRow = styled.View`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
`

export const RowKey = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat_700Bold';
  margin-right: 10px;
`

export const RowValue = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`
