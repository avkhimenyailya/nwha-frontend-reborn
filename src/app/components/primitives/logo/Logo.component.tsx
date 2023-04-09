import React from 'react';
import classes from './Logo.module.css';
import { useAppSelector } from '../../../store/store';


interface LogoProps {
}

function LogoComponent() {
    const stateTheme = useAppSelector(state => state.theme);

    const navigateToMainPage = () => {
        // todo navigate to main page
    };

    return (
        <>
            <img
                draggable={ false }
                alt={ 'there should be a logo here' }
                src={ require(
                    stateTheme.theme === 'light'
                        ? '../../../../static/icons/logo__light.svg'
                        : '../../../../static/icons/logo__dark.svg').default }
                className={ classes.logo }
                onClick={ navigateToMainPage }
            />
        </>
    );
};

export default LogoComponent;