import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import Missing from './pages/missing/non-existent-page/Missing';
import ProfilePage from './pages/protected/profile/ProfilePage';
import Protected from './pages/protected/Protected';
import SettingPage from './pages/protected/setting/SettingPage';

import classes from './App.module.css';
import RegisterPage from './pages/auth/register/RegisterPage';
import ZeroTask from './pages/protected/zero-task/ZeroTask';
import TodayPage from './pages/protected/main/today/TodayPage';
import ManifestoPage from './pages/protected/main/manifesto/ManifestoPage';
import AttributesPage from './pages/protected/main/attributes/AttributesPage';
import RulesPage from './pages/protected/main/rules/RulesPage';
import AboutPage from './pages/protected/main/about/AboutPage';
import Cp from './pages/protected/main/attributes/frame/1-CP/Cp';
import MainPage from './pages/protected/main/MainPage';
import Mf from './pages/protected/main/attributes/frame/2-MF/MF';
import Od from './pages/protected/main/attributes/frame/3-OD/OD';
import Ie from './pages/protected/main/attributes/frame/4-IE/IE';
import As from './pages/protected/main/attributes/frame/5-AS/AS';
import { useEffect } from 'react';
import { useAppSelector } from './store/store';
import ThingPage from './pages/protected/thing/ThingPage';

function App() {
    const currentTheme = useAppSelector(state => state.themeSlice.theme);

    useEffect(() => {
        document.querySelector('body')!.setAttribute('theme', currentTheme);
    }, [currentTheme]);

    return (
        <div className={ classes.App }>
            <Routes>
                <Route path={ '*' } element={ <Missing/> }/>
                <Route path={ 'login' } element={ <LoginPage/> }/>
                <Route path={ 'register' } element={ <RegisterPage/> }/>
                {/* require auth */ }
                <Route element={ <Protected/> }>
                    <Route path={ '/:username/*' } element={ <ProfilePage/> }/>
                    <Route path={ '/' } element={ <MainPage/> }>
                        <Route path={ 'today' } element={ <TodayPage/> }/>
                        <Route path={ 'manifesto' } element={ <ManifestoPage/> }/>
                        <Route path={ 'attributes' } element={ <AttributesPage/> }>
                            <Route path={ 'CP' } element={ <Cp/> }/>
                            <Route path={ 'MF' } element={ <Mf/> }/>
                            <Route path={ 'OD' } element={ <Od/> }/>
                            <Route path={ 'IE' } element={ <Ie/> }/>
                            <Route path={ 'AS' } element={ <As/> }/>
                        </Route>
                        <Route path={ 'rules' } element={ <RulesPage/> }/>
                        <Route path={ 'about' } element={ <AboutPage/> }/>
                    </Route>
                    <Route path={ 'start' } element={ <ZeroTask/> }/>
                    <Route path={ 'thing/:id' } element={ <ThingPage /> }/>
                    <Route path={ 'collection/:id' } element={ <SettingPage/> }/>
                    <Route path={ 'setting' } element={ <SettingPage/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;