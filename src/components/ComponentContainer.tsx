import * as React from 'react';
import { v4 } from 'uuid';
import WeatherComponent from './WeatherComponent';
import { usePageStore } from '../state/PageStore';
import ButtonComponent from './ButtonComponent';

interface ComponentContainerProps {
    component: PageComponent<any>
}

export const ComponentContainer = ({ component }: ComponentContainerProps): React.ReactElement | null => {
    const pageData = usePageStore((state) => state.pageData);
    const variables = usePageStore((state) => state.variables);

    let content: React.ReactElement | null = null;
    let options;

    switch (component.type) {
        case 'button':
            content = <ButtonComponent {...component.options as ButtonOptions} />;
            break;
        case 'condition':
            options = component.options as ButtonOptions;
            const isConditionMet = options.value === variables[options.variable];
            if (isConditionMet) {
                // @ts-ignore
                const children = pageData.lists.find((list) => list.id === component.children).components;
                const childComponents = children.map((id) => pageData?.components.find((entry) => entry.id === id));

                return (
                    <>
                        {childComponents.map((childComponent) => <ComponentContainer component={childComponent} key={v4()}/>)}
                    </>
                );
            }

            return null;
        case 'image':
            options = component.options as ImageOptions;
            content = (
                <div className='component-container'>
                    <img src={options.src} alt={options.alt} height={130} width={320}/>
                </div>
            );
            break;
        case 'weather':
            content = (
                <WeatherComponent {...component.options as WeatherOptions} />
            );
            break;
    }

    return content;
};
