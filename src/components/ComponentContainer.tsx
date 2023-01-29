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
                    <img src={options.src} alt={options.alt} />
                );
                break;
            case 'weather':
                content = (
                    <WeatherComponent {...component.options as WeatherOptions} />
                );
                break;
        }
    }

    return content;
}
