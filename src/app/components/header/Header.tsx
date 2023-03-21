import React, { FC, useState } from 'react';
import classes from './Header.module.css';
import Logo from '../primitives/logo/Logo';
import LetterButton from './letter-button/LetterButton';
import { Profile } from '../../models/Profile';
import SmallMenu from '../small-menu/SmallMenu';
import SmallButton from '../primitives/buttons/small-button/SmallButton';

interface HeaderProps {
    authProfile: Profile;
}

const Header: FC<HeaderProps> = ({ authProfile }: HeaderProps) => {
    const [ showMenu, setShowMenu ] = useState(false);

    const clickByLetterButton = () => {
        setShowMenu(prevState => !prevState);
    };

    const profile = () => {

    };

    const settings = () => {

    };

    const logout = () => {

    };

    return (
        <div className={ classes.container }>
            <Logo/>
            <LetterButton
                profileName={ authProfile.username }
                onClick={ clickByLetterButton }
            />
            { showMenu && <SmallMenu smallButtons={
                [ <SmallButton onClick={ profile }/>,
                    <SmallButton onClick={ settings }/>,
                    <SmallButton onClick={ logout }/> ]
            }/> }
        </div>
    );
};

export default Header;