import React, { FC, LegacyRef, useEffect } from 'react';
import classes from './Field.module.css';

interface FieldProps {
    value: string;
    placeholder?: string;

    inputError?: boolean;
    password?: boolean;
    disabled?: boolean;
    innerRef?: React.MutableRefObject<HTMLInputElement | undefined>;
    onKeyDown?: { (event: React.KeyboardEvent<HTMLInputElement>): any };
    onFocus?: { (event: React.FocusEvent<HTMLInputElement>): any };
    onChange: { (value: string): any };
}

const Field: FC<FieldProps> = (props: FieldProps) => {



    const inputClasses: string[]
        = [ classes.input, props.inputError ? classes.inputError : '' ];
    return (
        <input
            ref={ props.innerRef as LegacyRef<HTMLInputElement> }
            onFocus={ props.onFocus }
            type={ props.password ? 'password' : 'text' }
            disabled={ props.disabled }
            placeholder={ props.placeholder }
            value={ props.value }
            onChange={ e => props.onChange(e.target.value) }
            onKeyDown={ props.onKeyDown }
            className={ inputClasses.join(' ').trim() }
        />
    );
};

export default Field;