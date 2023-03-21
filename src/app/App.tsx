import React, { FC } from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/login-page';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import ProfilePage from './pages/profile/ProfilePage';


interface AppProps {
}

const App: FC<AppProps> = () => {
    return (
        <div className={ classes.container }>
            <Routes>
                <Route path={ '/login' } element={ <LoginPage/> }/>
                <Route path={ '/register/:invCode?' } element={ <LoginPage/> }/>

                <Route path={ '/profile/:profileId?' } element={ <ProfilePage/> }>
                    <Route path={ 'things' } element={ <p>things panel</p> }/>
                    <Route path={ 'collections' } element={ <p>collections panel</p> }/>
                    <Route path={ 'archive' } element={ <p>archive panel</p> }/>
                </Route>

                <Route path={ '/' } element={ <MainPage/> }/>
                <Route path={ '*' } element={ <NotFoundPage/> }/>
            </Routes>
        </div>
    );
};

export default App;