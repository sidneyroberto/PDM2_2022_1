import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import CryptoCard from '../../components/CryptoCard'
import Loading from '../../components/Loading'
import Price from '../../models/Price'
import { RootStackParamList } from '../../navigation'
import CurrencyService from '../../services/CurrencyService'
import { Container, Filter } from './styles'

type CryptoCurrenciesProps = NativeStackScreenProps<
  RootStackParamList,
  'CryptoCurrencies'
>

const currencyService = new CurrencyService()

const CryptoCurrencies = ({ navigation }: CryptoCurrenciesProps) => {
  const [prices, setPrices] = useState<Price[]>([])
  const [pricesToBeDisplayed, setPricesToBeDisplayed] = useState<Price[]>([])
  const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<string>('')

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
    <TouchableOpacity
      onPress={() =>
        navigation.push('CryptoDetails', {
          id: item.id,
          name: item.name,
        })
      }
    >
      <CryptoCard
        label={item.name}
        imgUrl={item.image}
        price={item.currentPrice}
        priceChange={item.priceChange}
      />
    </TouchableOpacity>
  )

  const renderFlatListFooter = () => {
    if (!pricesLoaded) {
      return <Loading />
    }

    return null
  }

  const filterPrices = (filter: string) => {
    setFilter(filter)
    if (filter) {
      const filteredPrices: Price[] = currencyService.filterByName(filter)
      setPricesToBeDisplayed(filteredPrices)
    } else {
      setPricesToBeDisplayed(prices)
    }
  }

  return (
    <Container>
      {prices.length > 0 && (
        <View>
          <Filter value={filter} onChangeText={filterPrices} />
          <FlatList<Price>
            data={pricesToBeDisplayed}
            renderItem={renderPrice}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.01}
            onEndReached={() => setPricesLoaded(false)}
            ListFooterComponent={renderFlatListFooter}
          />
        </View>
      )}

      {prices.length == 0 && <Loading />}
    </Container>
  )
}

export default CryptoCurrencies
