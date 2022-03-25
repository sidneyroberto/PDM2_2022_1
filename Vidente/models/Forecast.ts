type Forecast = {
  time: string
  description: string
  iconNumber: number
  temperature: number
}

export const convertTime = (datetime: string) => {
  return datetime ? datetime.split('T')[1].substring(0, 5) : ''
}

export default Forecast
