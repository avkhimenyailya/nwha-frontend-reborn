import React, { FC, useState } from 'react';
import classes from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import LoginPage from './pages/login-page/login-page';
import NotFoundPage from './pages/error-page/NotFoundPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import { profile, things } from './mock-data/data';
import ThingCellList from './components/thing-cell-list/ThingCellList';
import Loading from './components/loading/Loading';

interface AppProps {
}

const App: FC<AppProps> = () => {
    const [ loading, setLoading ] = useState(false);

    return (
        loading
            ?
            <Loading/>
            :
            <div className={ classes.container }>
                <Routes>
                    <Route path={ '/login' } element={ <LoginPage/> }/>
                    <Route path={ '/register/:invCode?' } element={ <LoginPage/> }/>

                    <Route path={ '/profile/:profileId?' } element={ <ProfilePage/> }>
                        <Route path={ 'things' } element={ <ThingCellList items={ profile.profileTasks }/> }/>
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