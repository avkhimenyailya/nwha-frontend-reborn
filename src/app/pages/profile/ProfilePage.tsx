import React from 'react';
import classes from './ProfilePage.module.css';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { profile } from '../../mock-data/data';
import ProfileDescription from '../../components/profile-info/profile-description/ProfileDescription';
import ProfileTraits from '../../components/profile-info/profile-traits/ProfileTraits';
import Navigator from '../../components/navigator/Navigator';

const ProfilePage = () => {
    return (
        <>
            <Header authProfile={ profile }/>
            <div className={ classes.profileHeader }>
                <div className={ classes.usernameContainer }>
                    <p>@{ profile?.username }</p>
                    <Navigator/>
                </div>
                <div className={ classes.profileInfoContainer }>
                    {/* profile description */ }
                    <div className={ classes.profileDescriptionContainer }>
                        <div className={ classes.labelContainer }>
                            <p>/description</p>
                        </div>
                        <ProfileDescription description={ profile.description }/>
                    </div>
                    {/* profile profile-traits */ }
                    <div className={ classes.profileTraitsContainer }>
                        <div className={ classes.labelContainer }>
                            <p>/attributes</p>
                        </div>
                        <ProfileTraits pairsTraits={ profile.profilePairsTraits }/>
                    </div>
                </div>
            </div>

            <Outlet/>
        </>
    );
};

export default ProfilePage;