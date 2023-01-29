import axios from 'axios';

const BACKEND_URL = 'http://localhost:3030';

const getPageData = async (id: string): Promise<PageData> => {
    const { data: { data } } = await axios.get<{ data: PageData }>(`${BACKEND_URL}/page/${id}`);

    return data;
};

const getWeatherForecast = async (lat: string, lon: string): Promise<WeatherForecast> => {
    const { data: { data } } = await axios.get<{ data: WeatherForecast }>(`${BACKEND_URL}/integration/weather?lat=${lat}&lon=${lon}`);

    return data;
};

export {
    getPageData,
    getWeatherForecast
};
