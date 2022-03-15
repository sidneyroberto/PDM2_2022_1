import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import CryptoCoin from '../../models/CryptoCoin'

import { RootStackParamList } from '../../navigation'
import CurrencyService from '../../services/CurrencyService'
import { Container, DetailsPanel, PanelRow, RowKey, RowValue } from './styles'

type CryptoDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'CryptoDetails'
>

const CryptoDetails = ({ navigation, route }: CryptoDetailsProps) => {
  const { id, name } = route.params
  const [crypto, setCrypto] = useState<CryptoCoin>({
    id: '',
    title: '',
    usd: 0,
    usdMarketCap: 0,
    usd24hVolume: 0,
    usd24hChange: 0,
  })
  const [isCryptoInfoLoaded, setIsCryptoInfoLoaded] = useState<boolean>(false)

  const currencyService = new CurrencyService()

  const loadCryptoPrice = async () => {
    if (id && name) {
      const crypto = await currencyService.getCrypto(id, name)
      setCrypto(crypto)
      setIsCryptoInfoLoaded(true)
    }
  }

  useEffect(() => {
    loadCryptoPrice()
  }, [])

  return (
    <Container>
      {isCryptoInfoLoaded && (
        <DetailsPanel>
          <PanelRow>
            <RowKey>Coin:</RowKey>
            <RowValue>{crypto.title}</RowValue>
          </PanelRow>
          <PanelRow>
            <RowKey>Symbol:</RowKey>
            <RowValue>{crypto.id}</RowValue>
          </PanelRow>
          <PanelRow>
            <RowKey>USD value:</RowKey>
            <RowValue>{crypto.usd.toFixed(2)}</RowValue>
          </PanelRow>
          <PanelRow>
            <RowKey>Market Cap (USD):</RowKey>
            <RowValue>{crypto.usdMarketCap.toFixed(2)}</RowValue>
          </PanelRow>
          <PanelRow>
            <RowKey>24h Volume (USD):</RowKey>
            <RowValue>{crypto.usd24hVolume.toFixed(2)}</RowValue>
          </PanelRow>
          <PanelRow>
            <RowKey>24h Change (USD):</RowKey>
            <RowValue>{crypto.usd24hChange.toFixed(2)}%</RowValue>
          </PanelRow>
        </DetailsPanel>
      )}

      {!isCryptoInfoLoaded && (
        <View style={styles.footer}>
          <ActivityIndicator size='large' color='#8c14fc' />
        </View>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
})

export default CryptoDetails
