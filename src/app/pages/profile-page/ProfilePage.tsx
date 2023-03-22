import React from 'react';
import classes from './ProfilePage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { profile } from '../../mock-data/data';
import ProfileDescription from '../../components/profile-info/profile-description/ProfileDescription';
import ProfileTraits from '../../components/profile-info/profile-traits/ProfileTraits';
import Navigator from '../../components/navigator/Navigator';

const ProfilePage = () => {

    return (
        <>
            <Header authProfile={ profile }/>
            <div className={ classes.info }>
                <div className={ classes.username }>
                    <p>@{ profile.username }</p>
                </div>
                <div className={ classes.navigator }>
                    <Navigator />
                </div>
                <div className={ classes.description }>
                    <p className={ classes.label }>/description</p>
                    <ProfileDescription text={ profile.description }/>
                </div>
                <div className={ classes.traits }>
                    <p className={ classes.label }>/attributes</p>
                    <ProfileTraits pairsTraits={ profile.profilePairsTraits }/>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default ProfilePage;