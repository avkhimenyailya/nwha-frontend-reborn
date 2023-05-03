import React, { useEffect, useState } from 'react';
import classes from './Header.module.css';
import LogoComponent from '../primitives/logo/Logo.component';
import LetterButton from './letter-button/LetterButton';
import { useAppSelector } from '../../store/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeButton from './theme-button/ThemeButton';
import SmallButton from '../primitives/buttons/small-button/SmallButton';
import ContextMenu from '../contex-menu/ContextMenu';

function Header() {
    const username = useAppSelector(state => state.authSlice.data?.username);
    const [showProfileContextMenu, setShowProfileContextMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [headerTransparent, setHeaderTransparent] = useState(false);

    useEffect(() => {
        setHeaderTransparent(location.pathname === '/today'
            || location.pathname === '/rules'
            || location.pathname === '/about'
            || location.pathname === '/manifesto'
            || location.pathname.includes('/attributes')
        );
    }, [location]);

    function renderProfileMenu() {
        return showProfileContextMenu && <div className={ classes.ProfileMenu }>
            <ContextMenu>
                <SmallButton
                    value={ 'profile' }
                    onClick={ () => navigate(`/${ username }`) }
                />
                <SmallButton
                    value={ 'log out' }
                    onClick={ () => navigate('/logout') }
                />
            </ContextMenu>
        </div>;
    }

    const headerClasses = [classes.Header, headerTransparent && classes.T];
    return (
        <header className={ headerClasses.join(' ') }>
            <div className={ classes.Bar }>
                <Link to={ '/today' }>
                    <LogoComponent/>
                </Link>
                <div className={ classes.LeftBar }>
                    <ThemeButton/>
                    <div
                        onMouseEnter={ () => setShowProfileContextMenu(true) }
                        onMouseLeave={ () => setShowProfileContextMenu(false) }
                        className={ classes.LetterButton }>
                        { renderProfileMenu() }
                        <LetterButton username={ username ?? '?' }/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;