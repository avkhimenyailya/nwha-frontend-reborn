import React from 'react';
import classes from './LetterButton.module.css';

interface LetterButtonProps {
    username: string;
}

function LetterButton(props: LetterButtonProps) {
    return (
        <input
            type={ 'button' }
            className={ classes.LetterButton }
            value={ props.username.charAt(0).toLocaleUpperCase() }
        />
    );
}

export default LetterButton;