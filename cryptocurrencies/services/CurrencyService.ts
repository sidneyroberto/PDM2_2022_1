import axios, { AxiosInstance } from 'axios'
import Price from '../models/Price'

const PER_PAGE: number = 15

export default class CurrencyService {

  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3/coins/markets'
    })
  }

  async getPrices(page: number): Promise<Price[]> {
    const result = await this._http.get('/', {
      params: {
        vs_currency: 'usd',
        per_page: PER_PAGE,
        price_change_percentage: '1h',
        page
      }
    })

    const pricesList: Price[] = result.data.map((p: any) => {
      const { id, symbol, name, image, current_price, price_change_percentage_1h_in_currency } = p
      return {
        id,
        symbol,
        name,
        image,
        currentPrice: current_price,
        priceChange: price_change_percentage_1h_in_currency
      }
    })

    return pricesList
  }
}