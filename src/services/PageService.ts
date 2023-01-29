import axios from 'axios';

const getPageData = async (id: string): Promise<PageData> => {
    const { data: { data } } = await axios.get<{ data: PageData }>(`http://localhost:3030/page/${id}`);

    return data;
};

const getWeatherForecast = async (lat: string, lon: string): Promise<WeatherForecast> => {
    const { data: { data } } = await axios.get<{ data: WeatherForecast }>(`http://localhost:3030/integration/weather?lat=${lat}&lon=${lon}`);

    return data;
};

export {
    getPageData,
    getWeatherForecast
};
