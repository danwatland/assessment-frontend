import { create } from 'zustand';
import { getPageData } from '../services/PageService';

type PageState = {
    pageData?: PageData,
    getPageData: (id: string) => void
}

export const usePageStore = create<PageState>((set) => ({
    getPageData: async (id) => {
        const pageData = await getPageData(id);

        set({ pageData });
    }
}));
