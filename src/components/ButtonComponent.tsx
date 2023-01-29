import * as React from 'react';
import { usePageStore } from '../state/PageStore';
import LocationPin from '../icons/location-pin.svg';
import Show from '../icons/show.svg';
import Hide from '../icons/hide.svg';

const ButtonComponent = (props: ButtonOptions): React.ReactElement => {
    const setPageVariable = usePageStore((state) => state.setPageVariable);
    let icon;

    if (props.variable === 'location') {
        icon = LocationPin;
    } else if (props.value === 'show') {
        icon = Show;
    } else if (props.value === 'hide') {
        icon = Hide;
    }

    return (
        <div className='button-with-icon component-container' onClick={() => setPageVariable(props.variable, props.value)}>
            <h3>{props.text}</h3>
            <img src={icon} alt={props.value} width={48} height={48} />
        </div>
    );
}

export default ButtonComponent;
