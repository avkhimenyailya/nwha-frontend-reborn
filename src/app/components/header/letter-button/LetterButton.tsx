import React, { FC, MouseEventHandler } from 'react';
import classes from './LetterButton.module.css';

interface LetterButtonProps {
    profileName: string;
    onClick: MouseEventHandler<HTMLInputElement>;
}

const LetterButton: FC<LetterButtonProps> = ({ profileName, onClick }: LetterButtonProps) => {
    return (
        <input
            type={ 'button' }
            className={ classes.letterButton }
            value={ profileName.toUpperCase().charAt(0) }
            onClick={ onClick }
        />
    );
};

export default LetterButton;