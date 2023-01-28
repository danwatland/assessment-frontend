import { create } from 'zustand';
import { getPageData, getWeatherForecast } from '../services/PageService';

type PageState = {
    forecast?: WeatherForecast,
    pageData?: PageData,
    getPageData: (id: string) => void,
    getWeatherForecast: (lat: string, lon: string) => void
}

export const usePageStore = create<PageState>((set) => ({
    getPageData: async (id) => {
        const pageData = await getPageData(id);

        set({ pageData });
    },
    getWeatherForecast: async (lat, lon) => {
        const forecast = await getWeatherForecast(lat, lon);

        set({ forecast });
    }
}));
