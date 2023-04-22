import React, { useState } from 'react';
import classes from './Header.module.css';
import LogoComponent from '../primitives/logo/Logo.component';
import LetterButton from './letter-button/LetterButton';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import ThemeButton from './theme-button/ThemeButton';
import ContextMenu from '../contex-menu/ContextMenu';
import SmallButton from '../primitives/buttons/small-button/SmallButton';
import { logout } from '../../store/reducers/authSlice';

function Header() {
    const username = useAppSelector(state => state.authSlice.data?.username);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    function navigateProfile() {
        navigate(`/${ username }`);
    }

    function doLogout() {
        dispatch(logout());
        navigate('/login', { replace: false });
    }

    function renderProfileMenu() {
        return <div className={ classes.ProfileMenu }>
            <p id="blink">for administrator</p>
            <ContextMenu>
                <SmallButton value={ 'profile' } onClick={ navigateProfile }/>
                <SmallButton value={ 'zero task' } onClick={ () => navigate('/start') }/>
                <SmallButton value={ 'logout' } onClick={ doLogout }/>
            </ContextMenu>
        </div>;
    }

    return (
        <header className={ classes.Header }>
            { showProfileMenu && renderProfileMenu() }
            <div className={ classes.Bar }>
                <Link to={ '/today' }>
                    <LogoComponent/>
                </Link>
                <div className={ classes.LeftBar }>
                    <ThemeButton/>
                    <LetterButton onClick={ () => {
                        setShowProfileMenu(prevState => !prevState);
                    } } username={ username ?? '?' }/>
                </div>
            </div>
        </header>
    );
}

export default Header;