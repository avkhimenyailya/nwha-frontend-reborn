import React from 'react';
import classes from './ProfilePage.module.css';
import ProfilePanels from './panels/ProfilePanels';
import { useParams } from 'react-router-dom';
import { profileApi } from '../../../store/api/profileApi';

function ProfilePage() {
    const { id } = useParams();

    const { data: profile } = profileApi.useFetchProfileByIdQuery(Number(id));
    const { data: collections } = profileApi.useFetchProfileCollectionsThingsByProfileIdQuery(Number(id));

    return (
        <div className={ classes.ProfilePage }>
            <p>@{ profile?.username }</p>
            { (profile && collections) &&
                <ProfilePanels profile={ profile! } collections={ collections! }/> }
        </div>
    );
}

export default ProfilePage;