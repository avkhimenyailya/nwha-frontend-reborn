import React from 'react';
import classes from './Logo.module.css';
import { useAppSelector } from '../../../store/store';

function LogoComponent() {
    const theme = useAppSelector(state => state.themeSlice.theme);
    return (
        <img
            draggable={ false }
            alt={ '???' }
            src={ require(theme === 'light'
                ? './logo.light.svg'
                : './logo.dark.svg').default }
            className={ classes.logo }
        />
    );
}

export default LogoComponent;