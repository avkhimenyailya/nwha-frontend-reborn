import React, { useEffect } from 'react';
import classes from './ProfilePage.module.css';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { profileApi } from '../../../store/api/profileApi';
import ProfileInfo from './info/ProfileInfo';
import ThingsPanel from './panels/things/ThingsPanel';
import CollectionPanel from './panels/collections/CollectionPanel';
import Udwarn from '../../../components/udwarn/Udwarn';

function ProfilePage() {
    const { username } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const {
        data: profile,
        isSuccess: profileSuccess
    } = profileApi.useFetchProfileByUsernameQuery(username!);

    const {
        data: collectionThings,
        isSuccess: collectionThingsSuccess
    } = profileApi.useFetchCollectionsThingsByProfileIdQuery(profile?.id, { skip: !profile?.id });

    useEffect(() => {
        document.title = `${ username } — nwha`;
        return () => {
            document.title = `nothingtowritehomeabout`;
        };
    }, [username]);

    useEffect(() => {
        if (profileSuccess && location.pathname === '/' + profile.username) {
            navigate(`things`);
        }
    }, [location.pathname, navigate, profile?.username, profileSuccess]);

    return (
        <div className={ classes.ProfilePage }>
            { profileSuccess &&
                <ProfileInfo profile={ profile }/>
            }
            { (profileSuccess && collectionThingsSuccess) &&
                <Routes>
                    <Route path={ 'things' } element={ <ThingsPanel profile={ profile }/> }/>
                    <Route path={ 'collections' }
                           element={ <CollectionPanel collectionsThings={ collectionThings }/> }/>
                    <Route path={ 'archive' } element={ <Udwarn/> }/>
                </Routes>
            }
        </div>
    );
}

export default ProfilePage;