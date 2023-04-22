import React from 'react';
import classes from './ThemeButton.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { toggleTheme } from '../../../store/reducers/themeSlice';

function ThemeButton() {
    const theme = useAppSelector(state => state.themeSlice.theme);
    const dispatch = useAppDispatch();

    return (
        <img draggable={ false } alt={ '?' }
             src={ require(theme === 'dark'
                 ? './theme-toggle.light.svg'
                 : './theme-toggle.dark.svg').default }
             className={ classes.ThemeButton }
             onClick={ () => dispatch(toggleTheme()) }
        />
    );
}

export default ThemeButton;