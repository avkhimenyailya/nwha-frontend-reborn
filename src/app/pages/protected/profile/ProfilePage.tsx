import React, { useEffect } from 'react';
import classes from './ProfilePage.module.css';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileApi } from '../../../store/api/profileApi';
import ProfileInfo from './info/ProfileInfo';
import ThingsPanel from './panels/things/ThingsPanel';
import CellSkeleton from '../../../components/cell-skeleton-reborn/CellSkeleton';

function ProfilePage() {
    const { username } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const {
        data: profile,
        isSuccess: profileSuccess
    } = profileApi.useFetchProfileByUsernameQuery(username!);

    useEffect(() => {
        document.title = `${ username } — nwha`;
        return () => {
            document.title = `nothingtowritehomeabout`;
        };
    }, [username]);

    useEffect(() => {
        console.log(location.pathname);
        if (profileSuccess && location.pathname === '/' + profile.username) {
            navigate(`things`);
        }
    }, [location.pathname, navigate, profile?.username, profileSuccess]);

    return (
        <div className={ classes.ProfilePage }>
            { profileSuccess &&
                <ProfileInfo profile={ profile }/>
            }
            { profileSuccess &&
                <Routes>
                    <Route path={ 'things' } element={ <ThingsPanel profile={ profile }/> }/>
                    <Route path={ 'collections' }
                           element={ <CellSkeleton remark={ '(archived)' } foreign={ true }
                                                   cellTitle={ '04 - 5' }
                                                   description={ 'long descr' }/> }/>
                </Routes>
            }
        </div>
    );
}

export default ProfilePage;