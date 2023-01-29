import { create } from 'zustand';
import { getPageData, getWeatherForecast } from '../services/PageService';

type PageState = {
    forecast?: WeatherForecast,
    pageData?: PageData,
    variables: { [key: string]: string },
    getPageData: (id: string) => void,
    getWeatherForecast: (lat: string, lon: string) => void,
    setPageVariable: (key: string, value: string) => void
}

export const usePageStore = create<PageState>((set, get) => ({
    variables: {},
    getPageData: async (id) => {
        const pageData = await getPageData(id);

        set({ pageData });
    },
    getWeatherForecast: async (lat, lon) => {
        const forecast = await getWeatherForecast(lat, lon);

        set({ forecast });
    },
    setPageVariable: (key, value) => {
        set({
            variables: {
                ...get().variables,
                [key]: value
            }
        })
    }
}));
