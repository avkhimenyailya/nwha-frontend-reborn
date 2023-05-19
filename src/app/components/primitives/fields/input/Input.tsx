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
    setValue: { (value: string): any };
    onChange?: { (event: React.ChangeEvent<HTMLInputElement>): any };

    inputByClick?: boolean;
}

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputClasses: string[] = [classes.Input, props.inputError && classes.InputError, props.disableStyle && classes.DisableStyle];
    return (
        <input
            ref={ ref }
            value={ props.value }
            onBlur={ props.onBlur }
            onFocus={ props.onFocus }
            disabled={ props.disabled || props.inputByClick }
            onKeyDown={ props.onKeyDown }
            placeholder={ props.placeholder }
            type={ props.password ? 'password' : 'text' }
            onChange={ e => {
                if (props.onChange) {
                    props.onChange(e);
                } else {
                    props.setValue(e.target.value);
                }
            } }
            className={ inputClasses.join(' ').trim() }
        />
    );
});

export default Input;