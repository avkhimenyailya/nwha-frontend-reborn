import React, { FC, LegacyRef, MouseEventHandler, useState } from 'react';
import classes from './Button.module.css';
import './Button.css';

interface ButtonProps {
    borderSide?: boolean;
    disabled?: boolean;
    value?: string;
    ref?: React.Ref<HTMLInputElement>;
    onKeyUp?: { (event: React.KeyboardEvent<HTMLInputElement>): any };
    onKeyDown?: { (event: React.KeyboardEvent<HTMLInputElement>): any };
    onClick: MouseEventHandler<HTMLInputElement>;
    invertColor?: boolean;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const [active, setActive] = useState(false);

    const buttonClasses: string[] =
        [classes.button, props.borderSide && classes.ButtonBorderSide, active ? 'active' : '',
            props.invertColor && classes.InvertColor];
    return (
        <input
            ref={ props.ref as LegacyRef<HTMLInputElement> }
            type={ 'button' }
            disabled={ props.disabled }
            value={ props.value || 'btn' }
            onClick={ props.onClick }
            onMouseUp={ () => setActive(false) }
            onMouseDown={ () => setActive(true) }
            onKeyUp={ props.onKeyUp }
            onKeyDown={ props.onKeyDown }
            className={ buttonClasses.join(' ').trim() }
        />
    );
};

export default Button;