import React from 'react';
import classes from './Protected.module.css';
import Header from '../../components/header/Header';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

function Protected() {
    return !useAppSelector(state => state.auth.data?.accessToken)
        ? <Navigate to={ '/login' }/>
        : <div className={ classes.Protected }>
            <Header/>
            <Outlet/>
        </div>;
}

export default Protected;