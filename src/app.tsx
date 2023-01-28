import React from 'react';
import { useParams } from 'react-router';
import { usePageStore } from './state/PageStore';
import PageComponent from './components/PageComponent';

const App = () => {
    const { pageData, getPageData } = usePageStore();
    const [components, setComponents] = React.useState<Component<any>[]>([]);
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        getPageData(id);
    }, [id, getPageData]);

    React.useEffect(() => {
        if (pageData) {
            const initialState = pageData.lists[0];
            const initialComponents = initialState.components
                .map<Component<any>>((componentId) => pageData.components.find((component) => component.id === componentId));

            setComponents(initialComponents);
        }
    }, [pageData]);

    return (
        <>
            {components.map((component, i) => <PageComponent key={i} type={component.type} options={component.options} />)}
        </>
    );
};

export default App;
