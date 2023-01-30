import { create } from 'zustand';
import { getPageData, getWeatherForecast } from '../services/PageService';

type PageState = {
    displayedComponentIds: number[],
    forecast?: WeatherForecast,
    initialComponents: PageComponent<any>[],
    pageData?: PageData,
    variables: Dictionary,
    getPageData: (id: string) => void,
    getWeatherForecast: (lat: string, lon: string) => void,
    setPageVariable: (key: string, value: string) => void
}

const convertVariablesToDictionary = (dictionary: Dictionary, variable: PageVariable): Dictionary => ({ ...dictionary, [variable.name]: variable.initialValue });

export const usePageStore = create<PageState>((set, get) => ({
    displayedComponentIds: [],
    initialComponents: [],
    variables: {},
    getPageData: async (id) => {
        const pageData = await getPageData(id);
        const variables = pageData.variables ? pageData.variables.reduce(convertVariablesToDictionary, {}) : {};
        const initialComponents = pageData.lists[0].components.map((id) => pageData.components.find((component) => component.id === id));

        set({
            initialComponents,
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

        set({ variables });
    }
}));
