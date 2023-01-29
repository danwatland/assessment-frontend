import * as React from 'react';
import WeatherComponent from './WeatherComponent';
import { usePageStore } from '../state/PageStore';
import ButtonComponent from './ButtonComponent';

interface ComponentContainerProps {
    component: Component<any>
}

export const ComponentContainer = ({ component }: ComponentContainerProps): React.ReactElement | null => {
    const displayedComponentIds = usePageStore((state) => state.displayedComponentIds);
    let content: React.ReactElement | null = null;

    const container = (content: React.ReactElement | null): React.ReactElement | null => {
        if (!content) {
            return null;
        }

        return (
            <div className='component-container'>
                {content}
            </div>
        )
    };

    if (displayedComponentIds.includes(component.id)) {
        switch (component.type) {
            case 'button':
                content = <ButtonComponent {...component.options as ButtonOptions} />;
                break;
            case 'condition':
                content = null;
                break;
            case 'image':
                const options = component.options as ImageOptions;
                content = (
                    <img src={options.src} alt={options.alt} height={130} width={320}/>
                );
                break;
            case 'weather':
                content = (
                    <WeatherComponent {...component.options as WeatherOptions} />
                );
                break;
        }
    }

    return container(content);
};
