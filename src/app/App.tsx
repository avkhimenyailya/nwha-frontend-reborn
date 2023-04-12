import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/private/main/MainPage';
import LoginPage from './pages/auth/login/LoginPage';
import Missing from './pages/missing/non-existent-page/Missing';
import ProfilePage from './pages/private/profile/ProfilePage';
import Protected from './pages/private/Protected';
import SettingPage from './pages/private/setting/SettingPage';

import classes from './App.module.css';
import RegisterPage from './pages/auth/register/RegisterPage';
import ZeroTask from './pages/private/zero-task/ZeroTask';
import { useAppSelector } from './store/store';
import CellModal from './components/cell-skeleton/modal/CellModal';

function App() {
    const visibleCellModal
        = useAppSelector(state => state.cellModal.visibleCellModal);

    return (
        <div className={ classes.App }>
            <Routes>
                <Route path={ '*' } element={ <Missing/> }/>
                <Route path={ 'login' } element={ <LoginPage/> }/> {/* redirect to /profile/usr/things */ }
                <Route path={ 'register' } element={ <RegisterPage/> }/> {/* redirect to start */ }

                {/* require auth */ }
                <Route element={ <Protected/> }>
                    <Route path={ '/' } element={ <MainPage/> }/>
                    <Route path={ 'start' } element={ <ZeroTask/> }/>
                    <Route path={ 'profile/:id' } element={ <ProfilePage/> }/>
                    <Route path={ 'thing/:id' } element={ <SettingPage/> }/>
                    <Route path={ 'collection/:id' } element={ <SettingPage/> }/>
                    <Route path={ 'setting' } element={ <SettingPage/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;