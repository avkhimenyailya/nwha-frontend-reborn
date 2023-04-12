import React from 'react';
import classes from './MainPage.module.css';

interface MainPageProps {

}

function MainPage(props: MainPageProps) {
    return (
        <div className={ classes.MainPage }>
            <p>this main page</p>
        </div>
    );
}

export default MainPage;