import * as React from 'react';
import WeatherComponent from './WeatherComponent';

export const generateComponent = (component: Component<any>, key: number) => {
    let content: React.ReactElement;
    let options;

    switch (component.type) {
        case 'button':
            content = <div/>;
            break;
        case 'condition':
            content = <div/>;
            break;
        case 'image':
            options = component.options as ImageOptions;
            content = (
                <img src={options.src} alt={options.alt} />
            );
            break;
        case 'weather':
            options = component.options as WeatherOptions;
            content = (
                <WeatherComponent lat={options.lat} lon={options.lon} />
            );
            break;
    }

    return (
        <div key={key}>
            {content}
        </div>
    );
}
