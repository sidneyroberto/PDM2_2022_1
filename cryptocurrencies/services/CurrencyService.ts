import axios, { AxiosInstance } from 'axios'
import CryptoCoin from '../models/CryptoCoin'
import Price from '../models/Price'

const CURRENCIES_AMOUNT = 250
const PER_PAGE = 15
export default class CurrencyService {
  private _http: AxiosInstance
  private _prices: Price[]

  constructor() {
    this._prices = []
    this._http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3',
    })
  }

  async getPrices(page: number): Promise<Price[]> {
    if (page < 1 || page > Math.ceil(CURRENCIES_AMOUNT / PER_PAGE)) {
      return []
    }

    if (this._prices.length == 0) {
      await this._loadPrices()
    }

    const startIndex = (page - 1) * PER_PAGE
    const endIndex =
      startIndex + PER_PAGE < CURRENCIES_AMOUNT
        ? startIndex + PER_PAGE
        : CURRENCIES_AMOUNT
    return this._prices.slice(startIndex, endIndex)
  }

  private async _loadPrices() {
    const result = await this._http.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        per_page: CURRENCIES_AMOUNT,
        price_change_percentage: '1h',
      },
    })

    const pricesList: Price[] = result.data.map((p: any) => {
      const {
        id,
        symbol,
        name,
        image,
        current_price,
        price_change_percentage_1h_in_currency,
      } = p
      return {
        id,
        symbol,
        name,
        image,
        currentPrice: current_price,
        priceChange: price_change_percentage_1h_in_currency,
      }
    })

    this._prices = pricesList
  }

  async getCrypto(id: string, title: string): Promise<CryptoCoin> {
    const result = await this._http.get('/simple/price', {
      params: {
        ids: id,
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_vol: true,
        include_24hr_change: true,
      },
    })

    const { usd, usd_market_cap, usd_24h_vol, usd_24h_change } = result.data[id]

    const crypto: CryptoCoin = {
      id,
      title,
      usd,
      usdMarketCap: usd_market_cap,
      usd24hVolume: usd_24h_vol,
      usd24hChange: usd_24h_change,
    }

    return crypto
  }

  filterByName(name: string): Price[] {
    let filteredPrices: Price[] = []

    if (name) {
      filteredPrices = this._prices.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    return filteredPrices.length < PER_PAGE
      ? filteredPrices
      : filteredPrices.slice(0, PER_PAGE)
  }
}
