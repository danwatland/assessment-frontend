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
        if (!forecast || forecast.lat !== props.lat || forecast.lon !== props.lon) {
            getWeatherForecast(props.lat, props.lon);
        }
    }, [forecast, getWeatherForecast, props.lat, props.lon]);

    return (
        <div className='weather-forecast component-container'>
            { forecast && (
                <>
                    <div className='weather-forecast-current-conditions'>
                        <img src={iconLookup[forecast.condition]} alt={forecast.conditionName} width={64} height={64}/>
                        <div className='weather-forecast-current-temperature'>
                            <h1>{`${forecast.temperature}${'\u2109'}`}</h1>
                            <h4>{forecast.conditionName}</h4>
                        </div>
                    </div>
                    <div className='weather-forecast-future-conditions'>
                        <h4>{forecast.location}</h4>
                        <div className='weather-forecast-daily-temperature'>
                            { forecast.upcomming.map((day) => (
                                <div key={day.day}>
                                    <img src={iconLookup[day.condition]} alt={day.conditionName} width={48} height={48}/>
                                    <h4>{day.day}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherComponent;
