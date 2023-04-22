import React, { MouseEventHandler } from 'react';
import classes from './LetterButton.module.css';

interface LetterButtonProps {
    username: string;
    onClick?: MouseEventHandler<HTMLInputElement>;
    handleHover?: (flag: boolean) => void;
}

function LetterButton(props: LetterButtonProps) {
    return (
        <input
            type={ 'button' }
            className={ classes.LetterButton }
            value={ props.username.charAt(0).toLocaleUpperCase() }
            onClick={ props.onClick }
        />
    );
}

export default LetterButton;