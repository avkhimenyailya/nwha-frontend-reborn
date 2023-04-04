import React, { FC, MouseEventHandler, useEffect } from 'react';
import classes from './LetterButton.module.css';

interface LetterButtonProps {
    profileName?: string;
    onClick?: MouseEventHandler<HTMLInputElement>;
    handleHover: (flag: boolean) => void;
}

const LetterButton: FC<LetterButtonProps> = ({ handleHover, profileName, onClick }: LetterButtonProps) => {


    useEffect(() => {

    }, []);

    return (
        <input
            type={ 'button' }
            onMouseEnter={ (e) => {
                handleHover(true);
            } }
            onMouseLeave={ (e) => {
                handleHover(false);
            } }
            className={ classes.letterButton }
            value={ '?' }
            onClick={ onClick }
        />
    );
};

export default LetterButton;