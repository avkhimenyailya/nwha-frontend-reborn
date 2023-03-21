import React, { FC, useState } from 'react';
import classes from './Header.module.css';
import Logo from '../primitives/logo/Logo';
import LetterButton from './letter-button/LetterButton';
import { Profile } from '../../models/Profile';
import ContextMenu from '../contex-menu/ContextMenu';
import SmallButton from '../primitives/buttons/small-button/SmallButton';

interface HeaderProps {
    authProfile: Profile;
}

const Header: FC<HeaderProps> = ({ authProfile }: HeaderProps) => {
    const [ showMenu, setShowMenu ] = useState(false);

    const handleHover = (flag: boolean): void => {
        setShowMenu(flag);
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
            <div style={ {
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            } }>
                <div style={ { marginLeft: 'auto' } }>
                    <LetterButton
                        profileName={ authProfile.username }
                        handleHover={ handleHover }
                    />
                </div>
                { showMenu &&
                    <div
                        onMouseEnter={ () => setShowMenu(true) }
                        onMouseLeave={ () => setShowMenu(false) }
                        style={ {
                            position: 'absolute',
                            right: 0,
                            top: 26 + 'px',
                            paddingTop: 8 + 'px',
                            cursor: 'pointer'
                        } }>
                        <ContextMenu
                            buttons={ [
                                <SmallButton value={ 'profile' } onClick={ profile }/>,
                                <SmallButton value={ 'setting' } onClick={ settings }/>,
                                <SmallButton value={ 'log out' } onClick={ logout }/>
                            ] }
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;