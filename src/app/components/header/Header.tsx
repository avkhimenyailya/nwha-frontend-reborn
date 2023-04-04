import React, { useState } from 'react';
import classes from './Header.module.css';
import Logo from '../primitives/logo/Logo';
import LetterButton from './letter-button/LetterButton';
import { Profile } from '../../models/Profile';

interface HeaderProps {
    authProfile?: Profile;
}

function Header({ authProfile }: HeaderProps) {
    const [ showMenu, setShowMenu ] = useState(false);

    function profile() {

    }

    function settings() {

    }

    function logout() {

    }

    return (
        <div className={ classes.Header }>
            <Logo/>
            <LetterButton
                profileName={ authProfile?.username }
                handleHover={ setShowMenu }
            />
        </div>
    );
}

export default Header;