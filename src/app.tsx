import React from 'react';
import { useParams } from 'react-router';
import { usePageStore } from './state/PageStore';
import { ComponentContainer } from './components/ComponentContainer';

const App = () => {
    const initialComponents = usePageStore((state) => state.initialComponents);
    const getPageData = usePageStore((state) => state.getPageData);

    const [components, setComponents] = React.useState<PageComponent<any>[]>([]);
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        getPageData(id);
    }, [id, getPageData]);

    React.useEffect(() => {
        if (initialComponents) {
            setComponents(initialComponents);
        }
    }, [initialComponents]);

    return (
        <>
            {components.map((component, i) => <ComponentContainer component={component} key={i} />)}
        </>
    );
};

export default App;
