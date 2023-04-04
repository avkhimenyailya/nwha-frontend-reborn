import React from 'react';
import Header from '../../components/header/Header';
import { Outlet } from 'react-router-dom';

function Private() {


    return (
        <div style={ {
            paddingLeft: '16px',
            paddingRight: '16px'
        } }>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Private;