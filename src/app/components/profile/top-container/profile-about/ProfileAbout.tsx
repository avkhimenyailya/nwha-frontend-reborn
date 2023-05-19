import React from 'react';
import classes from './ProfileAbout.module.css';

interface ProfileDescriptionProps {
    profileDescription?: string;
    profilePersonalLink?: string;
}

function ProfileAbout(props: ProfileDescriptionProps) {

    return (
        <div className={ classes.ProfileAbout }>
            <div className={ classes.DescriptionContainer }>
                <p>{ props.profileDescription ?? '???' }</p>
            </div>
            { props.profilePersonalLink &&
                <div className={ classes.LinkContainer }>
                    <a href={ props.profilePersonalLink } target={ '_blank' }
                       id={ 'w' } rel="noreferrer">{ props.profilePersonalLink }</a>
                </div> }
        </div>
    );
}

export default ProfileAbout;