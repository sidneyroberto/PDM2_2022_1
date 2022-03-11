import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native'

import CryptoCard from '../../components/CryptoCard'
import Price from '../../models/Price'
import CurrencyService from '../../services/CurrencyService'
import { Container, Filter } from './styles'

const CryptoCurrencies = () => {
  const [prices, setPrices] = useState<Price[]>([])
  const [pricesToBeDisplayed, setPricesToBeDisplayed] = useState<Price[]>([])
  const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('')

  const currencyService = new CurrencyService()

  const loadPrices = async () => {
    if (!pricesLoaded && !filter) {
      setPricesLoaded(true)
      let currentPrices = await currencyService.getPrices(currentPage)
      currentPrices = [...prices, ...currentPrices]
      setPrices(currentPrices)
      setPricesToBeDisplayed(currentPrices)
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    loadPrices()

    return () => {
      setPricesLoaded(true)
    }
  })

  const renderPrice: ListRenderItem<Price> = ({ item }) => (
    <CryptoCard
      label={item.name}
      imgUrl={item.image}
      price={item.currentPrice}
      priceChange={item.priceChange}
    />
  )

  const renderFlatListFooter = () => {
    if (!pricesLoaded) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
        </View>
      )
    }

    return null
  }

  const filterPrices = (filter: string) => {
    setFilter(filter)
    if (filter) {
      const filteredPrices: Price[] = prices.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      )

      setPricesToBeDisplayed(filteredPrices)
    } else {
      setPricesToBeDisplayed(prices)
    }
  }

  return (
    <Container>
      <Filter value={filter} onChangeText={filterPrices} />
      <FlatList<Price>
        data={pricesToBeDisplayed}
        renderItem={renderPrice}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.01}
        onEndReached={() => setPricesLoaded(false)}
        ListFooterComponent={renderFlatListFooter}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
})

export default CryptoCurrencies
