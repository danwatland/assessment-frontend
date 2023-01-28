import * as React from 'react';

interface PageComponentProps {
    type: 'button' | 'condition' | 'image' | 'weather',
    options: ImageOptions | WeatherOptions
}

const PageComponent = (props: PageComponentProps): React.ReactElement => {
    return props.type === 'image' ?
        <img src={(props.options as ImageOptions).src} alt={(props.options as ImageOptions).alt} /> :
        <div>Weather</div>
};

export default PageComponent;
