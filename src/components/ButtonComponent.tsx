import * as React from 'react';
import { usePageStore } from '../state/PageStore';

const ButtonComponent = (props: ButtonOptions): React.ReactElement => {
    const setPageVariable = usePageStore((state) => state.setPageVariable);

    return (
        <button onClick={() => setPageVariable(props.variable, props.value)}>{props.text}</button>
    );
}

export default ButtonComponent;
