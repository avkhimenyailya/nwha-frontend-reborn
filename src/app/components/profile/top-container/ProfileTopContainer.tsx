import React, { MouseEventHandler } from 'react';
import classes from './ProfileTopContainer.module.css';
import { Profile } from '../../../models/Profile';
import ProfileUsername from './profile-username/ProfileUsername';
import ProfileTabPanel from './profile-tab-panel/ProfileTabPanel';
import ProfileAbout from './profile-about/ProfileAbout';
import ProfileAttributes from './profile-attributes/ProfileAttributes';
import StringButton from '../../primitives/buttons/string-button/StringButton';
import { useAppSelector } from '../../../store/store';

interface ProfileTopContainerProps {
    profile: Profile;
    onClickEditDescriptionButton: MouseEventHandler<HTMLInputElement>;
}

function ProfileTopContainer({ profile, ...props }: ProfileTopContainerProps) {
    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);
    return (
        <div className={ classes.ProfileTopContainer }>
            <div className={ classes.UsernameContainer }>
                <ProfileUsername username={ profile.username }/>
            </div>
            <div className={ classes.TabPanelContainer }>
                <ProfileTabPanel foreign={ !(profile.id === principalProfileId) }/>
            </div>
            <div className={ classes.AboutContainer }>
                <div className={ classes.ContainerLabel }>
                    <p>{ '/about' }</p>
                    { profile.id === principalProfileId &&
                        <StringButton onClick={ props.onClickEditDescriptionButton } value={ 'edit' }/>
                    }
                </div>
                <ProfileAbout
                    profileDescription={ profile.description }
                    profilePersonalLink={ profile.personalLink }
                />
            </div>
            <div className={ classes.AttributesContainer }>
                <div className={ classes.ContainerLabel }>
                    <p>{ '/attributes' }</p>
                </div>
                <ProfileAttributes profileAttributes={ profile.profileAttributes }/>
            </div>
        </div>
    );
}

export default ProfileTopContainer;