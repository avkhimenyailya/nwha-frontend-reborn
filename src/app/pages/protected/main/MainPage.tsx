import React, { useEffect } from 'react';
import classes from './MainPage.module.css';
import Menu from '../../../components/menu/Menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface MainPageProps {

}

function MainPage(props: MainPageProps) {
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            nav('today');
        }
    }, [location.pathname, nav]);

    return (
        <div className={ classes.MainPage }>
            <div className={ classes.Menu }>
                <Menu
                    linkNames={ [
                        ['Today', 'today'],
                        ['Manifesto', 'manifesto'],
                        ['Attributes', 'attributes'],
                        ['Rules', 'rules'],
                        ['About', 'about']
                    ] }
                />
            </div>
            <div className={ classes.Content }>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainPage;