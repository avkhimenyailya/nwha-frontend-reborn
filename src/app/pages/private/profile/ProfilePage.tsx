import React from 'react';
import classes from './ProfilePage.module.css';
import ProfilePanels from './panels/ProfilePanels';
import { useParams } from 'react-router-dom';
import { profileApi } from '../../../store/api/profileApi';

function ProfilePage() {
    const { id } = useParams();

    const { data: profile } = profileApi.useFetchProfileByIdQuery(Number(id));
    const { data: collections } = profileApi.useFetchProfileCollectionsThingsByProfileIdQuery(Number(id));

    console.log('ProfilePage: ', profile?.profileTasks);

    return (
        <div className={ classes.ProfilePage }>
            { profile ? <p>@{ profile?.username }</p> : <p>@not found user</p> }
            { (profile && collections) && <ProfilePanels data={ { profile, collections } }/> }
        </div>
    );
}

export default ProfilePage;