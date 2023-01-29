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
const calculateDisplayedComponentIds = (pageData: PageData, variables: Dictionary): number[] => pageData.components
    .filter((component) => canComponentBeDisplayed(component.id, pageData, variables))
    .map((component) => component.id);

const canComponentBeDisplayed = (componentId: number, pageData: PageData, variables: Dictionary): boolean => {
    const listContainingComponentId = pageData.lists.find((list) => list.components.includes(componentId));

    if (listContainingComponentId!.id !== 0) {
        const componentControllingList = pageData.components.find((component) => component.children === listContainingComponentId!.id);
        const options = componentControllingList.options as ConditionOptions;
        if (options.value === variables[options.variable]) {
            return canComponentBeDisplayed(componentControllingList.id, pageData, variables);
        }
        return false;
    }

    return true;
}

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
