import React, {useEffect} from 'react';
import classes from './MainPage.module.scss';
import Menu from '../../../components/menu/Menu';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

function MainPage() {
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            nav('today');
        }
    }, [location.pathname, nav]);

    return (
        <div className={classes.main_page}>
            <div className={classes.menu}>
                <MainPageMenu/>
            </div>
            <div className={classes.content}>
                <Outlet/>
            </div>
        </div>
    );
}

function MainPageMenu() {
    return <Menu
        linkNames={[
            ['Today', 'today'],
            ['Manifesto', 'manifesto'],
            ['Attributes', 'attributes'],
            ['Rules', 'rules'],
            ['About', 'about']
        ]}
    />
}

export default MainPage;