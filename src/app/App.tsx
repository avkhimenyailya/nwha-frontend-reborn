import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/private/main/MainPage';
import LoginPage from './pages/auth/login/LoginPage';
import Missing from './pages/missing/Missing';
import ProfilePage from './pages/private/profile/ProfilePage';
import Private from './pages/private/Private';
import SettingPage from './pages/private/setting/SettingPage';
import ThingsPanel from './pages/private/profile/panels/things/ThingsPanel';
import CollectionsPanel from './pages/private/profile/panels/collections/CollectionsPanel';
import ArchivePanel from './pages/private/profile/panels/archive/ArchivePanel';

import classes from './App.module.css';
import RegisterPage from './pages/auth/register/RegisterPage';
import ZeroTask from './pages/private/zero-task/ZeroTask';

function App() {
    const main: string =                        '/';
    const missing: string =                     '*';
    const login: string =                       'login';
    const register: string =                    'register/:invCode';
    const zeroTask: string =                    'start'
    const profile: string =                     'profile/:profileId?';
    const profileThings: string =               'things';
    const profileCollections: string =          'collections';
    const profileArchive: string =              'archive';
    const thing: string =                       'thing/:id';
    const collection: string =                  'collection/:id';
    const setting: string =                     'setting';

    return (
        <div className={ classes.App }>
            <Routes>
                <Route path={ missing } element={ <Missing/> }/>
                <Route path={ login } element={ <LoginPage/> }/>
                <Route path={ register } element={ <RegisterPage/> }/>

                {/* must be no public */ }
                <Route element={ <Private/> }>
                    <Route path={ zeroTask } element={ <ZeroTask /> } />
                    <Route path={ main } element={ <MainPage/> }/>
                    <Route path={ profile } element={ <ProfilePage/> }>
                        <Route path={ profileThings } element={ <ThingsPanel/> }/>
                        <Route path={ profileCollections } element={ <CollectionsPanel/> }/>
                        <Route path={ profileArchive } element={ <ArchivePanel/> }/>
                    </Route>
                    <Route path={ thing } element={ <SettingPage/> }/>
                    <Route path={ collection } element={ <SettingPage/> }/>
                    <Route path={ setting } element={ <SettingPage/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;