import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic
} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, View, StyleSheet } from 'react-native';
import CryptoCard from "./components/CryptoCard"
import Price from './models/Price';
import CurrencyService from './services/CurrencyService';
import { Container } from "./styles"


const App = () => {

  const [prices, setPrices] = useState<Price[]>([])
  const [pricesLoaded, setPricesLoaded] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const currencyService = new CurrencyService()

  useEffect(() => {
    const loadPrices = async () => {
      if (!pricesLoaded) {
        let currentPrices = await currencyService.getPrices(currentPage)
        currentPrices = [...prices, ...currentPrices]
        setPrices(currentPrices)
        setPricesLoaded(true)
        setCurrentPage(currentPage + 1)
      }
    }

    loadPrices()

    return () => {
      setPricesLoaded(true)
    }
  })

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  const renderPrice: ListRenderItem<Price> = ({ item }) => (
    <CryptoCard
      label={item.name}
      imgUrl={item.image}
      price={item.currentPrice}
      priceChange={item.priceChange} />
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

  return (
    <Container>
      <FlatList<Price>
        data={prices}
        renderItem={renderPrice}
        keyExtractor={item => item.id}
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
    marginVertical: 20
  }
})

export default App