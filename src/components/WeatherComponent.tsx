import * as React from 'react';
import { usePageStore } from '../state/PageStore';
import Clear from '../icons/clear-day.svg';
import Rain from '../icons/rain.svg';
import Cloudy from '../icons/cloudy.svg';

const iconLookup: { [key: string]: any } = {
    'clear-day': Clear,
    'cloudy': Cloudy,
    'rain': Rain
};

const WeatherComponent = (props: WeatherOptions): React.ReactElement => {
    const { forecast, getWeatherForecast } = usePageStore((store) => ({ getWeatherForecast: store.getWeatherForecast, forecast: store.forecast }));

    React.useEffect(() => {
        getWeatherForecast(props.lat, props.lon);
    }, [getWeatherForecast, props.lat, props.lon]);

    return (
        <div>
            { forecast && (
                <>
                    <img src={iconLookup[forecast.condition]} alt={forecast.conditionName} />
                    <h1>{`${forecast.temperature}${'\u2109'}`}</h1>
                    <h4>{forecast.conditionName}</h4>
                    <h4>{forecast.location}</h4>
                    { forecast.upcomming.map((day) => (
                        <div key={day.day}>
                            <img src={iconLookup[forecast.condition]} alt={day.conditionName}/>
                            <h4>{day.day}</h4>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default WeatherComponent;
