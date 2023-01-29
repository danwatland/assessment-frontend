import * as React from 'react';
import WeatherComponent from './WeatherComponent';
import { usePageStore } from '../state/PageStore';
import ButtonComponent from './ButtonComponent';

interface ComponentContainerProps {
    component: PageComponent<any>
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
    }

    return content;
};
