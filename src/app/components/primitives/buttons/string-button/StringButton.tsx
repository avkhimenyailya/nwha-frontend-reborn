import React, { MouseEventHandler } from 'react';
import classes from './StringButton.module.css';

interface StringButtonProps {
    value?: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLInputElement>;
}

function StringButton(props: StringButtonProps) {
    return (
        <input
            className={ classes.StringButton }
            type={ 'button' }
            disabled={ props.disabled }
            value={ `[${ props.value || 'btn' }]` }
            onClick={ props.onClick }
        />
    );
}

export default StringButton;