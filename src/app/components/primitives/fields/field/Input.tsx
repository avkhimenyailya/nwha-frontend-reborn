import React from 'react';
import classes from './Input.module.css';

interface InputProps {
    value: string;
    placeholder?: string;
    disableStyle?: boolean;

    password?: boolean;
    disabled?: boolean;
    inputError?: boolean;
    onBlur?: { (event: React.FocusEvent<HTMLInputElement>): void };
    onFocus?: { (event: React.FocusEvent<HTMLInputElement>): any };
    onKeyDown?: { (event: React.KeyboardEvent<HTMLInputElement>): any };
    onChange: { (value: string): any };
}

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputClasses: string[] = [classes.Input, props.inputError && classes.InputError, props.disableStyle && classes.DisableStyle];
    return (
        <input
            ref={ ref }
            value={ props.value }
            onBlur={ props.onBlur }
            onFocus={ props.onFocus }
            disabled={ props.disabled }
            onKeyDown={ props.onKeyDown }
            placeholder={ props.placeholder }
            onChange={ e => props.onChange(e.target.value) }
            type={ props.password ? 'password' : 'text' }
            className={ inputClasses.join(' ').trim() }
        />
    );
});

export default Input;