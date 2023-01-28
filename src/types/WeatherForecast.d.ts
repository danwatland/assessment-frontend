interface WeatherForecastDayOverview {
    day: string,
    condition: string,
    conditionName: string
}

interface WeatherForecast {
    lon: string,
    lat: string,
    condition: string,
    conditionName: string,
    temperature: number,
    unit: string,
    location: string,
    upcomming: WeatherForecastDayOverview[]
}
