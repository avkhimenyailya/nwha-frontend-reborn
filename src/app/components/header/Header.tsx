import React, { useState } from 'react';
import classes from './Header.module.css';
import LogoComponent from '../primitives/logo/Logo.component';
import LetterButton from './letter-button/LetterButton';
import { Profile } from '../../models/Profile';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleTheme } from '../../store/reducers/themeSlice';

interface HeaderProps {
    authProfile?: Profile;
}


function Header({ authProfile }: HeaderProps) {
    const [showMenu, setShowMenu] = useState(false);

    function profile() {

    }

    function settings() {

    }

    function logout() {

    }


    function renderThemeIcon() {
        return <img
            draggable={ false }
            alt={ '?' }
            src={ require(
                localStorage.getItem('theme') === 'light'
                    ? '../../../static/icons/theme_toggle__dark.svg'
                    : '../../../static/icons/theme_toggle__light.svg').default }
            className={ classes.ChangeThemeBtn }
            onClick={ () => {
                document.querySelector('body')?.setAttribute('theme', 'dark')
            }}
        />;
    }

    return (
        <div className={ classes.Header }>
            <LogoComponent/>
            <div style={ { display: 'flex' } }>
                { renderThemeIcon() }
                <LetterButton
                    profileName={ authProfile?.username }
                    handleHover={ setShowMenu }
                />
            </div>
        </div>
    );
}

export default Header;