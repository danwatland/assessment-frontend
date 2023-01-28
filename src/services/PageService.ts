import axios from 'axios';

const getPageData = async (id: string): Promise<PageData> => {
    const { data: { data } } = await axios.get<{ data: PageData }>(`http://localhost:3030/page/page-one`);

    return data;
};

export {
    getPageData
};
