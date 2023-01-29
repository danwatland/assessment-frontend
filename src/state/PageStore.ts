import { create } from 'zustand';
import { getPageData, getWeatherForecast } from '../services/PageService';
import { calculateDisplayedComponentIds } from '../helpers/ComponentDisplayHelpers';

type PageState = {
    displayedComponentIds: number[],
    forecast?: WeatherForecast,
    pageData?: PageData,
    variables: Dictionary,
    getPageData: (id: string) => void,
    getWeatherForecast: (lat: string, lon: string) => void,
    setPageVariable: (key: string, value: string) => void
}

const convertVariablesToDictionary = (dictionary: Dictionary, variable: PageVariable): Dictionary => ({ ...dictionary, [variable.name]: variable.initialValue });

export const usePageStore = create<PageState>((set, get) => ({
    displayedComponentIds: [],
    variables: {},
    getPageData: async (id) => {
        const pageData = await getPageData(id);
        const variables = pageData.variables ? pageData.variables.reduce(convertVariablesToDictionary, {}) : {};
        const displayedComponentIds = calculateDisplayedComponentIds(pageData, variables);

        set({
            displayedComponentIds,
            pageData,
            variables
        });
    },
    getWeatherForecast: async (lat, lon) => {
        const forecast = await getWeatherForecast(lat, lon);

        set({ forecast });
    },
    setPageVariable: (key, value) => {
        const variables = {
            ...get().variables,
            [key]: value
        };

        const displayedComponentIds = calculateDisplayedComponentIds(get().pageData!, variables);

        set({
            variables,
            displayedComponentIds
        });
    }
}));
