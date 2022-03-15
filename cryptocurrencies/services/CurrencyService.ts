import axios, { AxiosInstance } from 'axios'
import CryptoCoin from '../models/CryptoCoin'
import Price from '../models/Price'

const PER_PAGE: number = 15

export default class CurrencyService {
  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3',
    })
  }

  async getPrices(page: number): Promise<Price[]> {
    const result = await this._http.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        per_page: PER_PAGE,
        price_change_percentage: '1h',
        page,
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

    return pricesList
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
}
