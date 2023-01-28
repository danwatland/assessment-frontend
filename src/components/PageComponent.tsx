import * as React from 'react';
import WeatherComponent from './WeatherComponent';

interface PageComponentProps {
    type: 'button' | 'condition' | 'image' | 'weather',
    options: ImageOptions | WeatherOptions
}

const PageComponent = (props: PageComponentProps): React.ReactElement => {
    return props.type === 'image' ?
        <img src={(props.options as ImageOptions).src} alt={(props.options as ImageOptions).alt} /> :
        <WeatherComponent lat={((props.options as WeatherOptions).lat)} lon={((props.options as WeatherOptions)).lon} />
};

export default PageComponent;
