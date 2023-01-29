import { create } from 'zustand';
import { getPageData, getWeatherForecast } from '../services/PageService';

type PageState = {
    displayedComponentIds: number[],
    forecast?: WeatherForecast,
    pageData?: PageData,
    variables: Dictionary,
    getPageData: (id: string) => void,
    getWeatherForecast: (lat: string, lon: string) => void,
    setPageVariable: (key: string, value: string) => void
}

const convertVariablesToDictionary = (dictionary: Dictionary, variable: Variable): Dictionary => ({ ...dictionary, [variable.name]: variable.initialValue });

export const usePageStore = create<PageState>((set, get) => ({
    displayedComponentIds: [],
    variables: {},
    getPageData: async (id) => {
        const pageData = await getPageData(id);
        const variables = pageData.variables ? pageData.variables.reduce(convertVariablesToDictionary, {}) : {};
        const initialComponents = pageData.lists[0].components;

        set({
            displayedComponentIds: initialComponents,
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

        const displayedComponentIds = get().pageData!.components
            .filter((component) => {
                let canBeDisplayed = true;
                const listContainingComponentId = get().pageData!.lists.find((list) => list.components.includes(component.id));

                if (listContainingComponentId!.id !== 0) {
                    const componentControllingList = get().pageData!.components.find((component) => component.children === listContainingComponentId!.id);
                    const options = componentControllingList.options as ConditionOptions;
                    canBeDisplayed = options.value === variables[options.variable];
                }

                return canBeDisplayed;
            })
            .map((component) => component.id);

        set({
            variables,
            displayedComponentIds
        });
    }
}));
