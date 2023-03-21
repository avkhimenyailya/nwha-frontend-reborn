import React, { FC } from 'react';
import classes from './Logo.module.css';

interface LogoProps {
}

const Logo: FC<LogoProps> = () => {
    const navigateToMainPage = () => {
        // todo navigate to main page
    };

    return (
        <img
            draggable={ false }
            alt={ 'there should be a logo here' }
            src={ require('./Logo.svg').default }
            className={ classes.logo }
            onClick={ navigateToMainPage }
        />
    );
};

export default Logo;