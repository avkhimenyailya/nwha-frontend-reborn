import React from 'react';
import classes from './Protected.module.scss';
import Header from '../../components/header/Header';
import {Navigate, Outlet} from 'react-router-dom';
import Footer from "../../components/footer/Footer";
import {useAuthHook} from "../../hooks/useAuthHook";

function Protected() {
    const {isAuth} = useAuthHook()

    return isAuth ?
        <div className={classes.ProtectedPage}>
            <Header className={classes.Header}/>
            <div className={classes.Content}>
                <Outlet/>
            </div>
            <Footer/>
        </div> :
        <Navigate to={'/login'}/>
}

export default Protected;