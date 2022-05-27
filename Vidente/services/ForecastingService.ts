import { FORECASTING_ENDPOINT, CITY_CODE, API_KEY } from './../config/api'
import { AxiosInstance } from './../node_modules/axios/index.d'
import axios from 'axios'

import Forecast, { convertTime } from '../models/Forecast'
import { API_URL } from '../config/api'

export default class ForecastinService {
  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: API_URL,
    })
  }

  async getNextForecasts(cityCode: number): Promise<Forecast[]> {
    const forecasts: Forecast[] = []

    const response = await this._http.get(
      `${FORECASTING_ENDPOINT}/${cityCode}`,
      {
        params: {
          apikey: API_KEY,
          language: 'pt-BR',
          metric: 'true',
        },
      }
    )

    if (response.status == 200) {
      const { data } = response
      data.forEach((d: any) => {
        const { DateTime, IconPhrase, WeatherIcon, Temperature } = d
        const { Value } = Temperature

        const forecast: Forecast = {
          description: IconPhrase,
          iconNumber: WeatherIcon,
          temperature: Value,
          time: convertTime(DateTime),
        }

        forecasts.push(forecast)
      })
    }

    return forecasts
  }
}
