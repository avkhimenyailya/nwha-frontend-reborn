import React, { FC } from 'react';
import Header from '../../components/header/Header';
import { profile } from '../../mock-data/data';

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = () => {

    return (
        <>
            <Header authProfile={ profile }/>
            <p>this main page</p>
        </>
    );
};

export default MainPage;
