import React from 'react';
import classes from './ProfileInfo.module.css';
import { Profile } from '../../../../models/Profile';
import Menu from '../../../../components/menu/Menu';
import ProfileTraits from '../../../../components/profile-info/profile-traits/ProfileTraits';

interface ProfileInfoProps {
    profile: Profile;
}

function ProfileInfo({ profile }: ProfileInfoProps) {
    return (
        <div className={ classes.ProfileInfo }>
            <div className={ classes.Username }>
                <p>@{ profile.username }</p>
            </div>
            <div className={ classes.Menu }>
                <Menu
                    linkNames={ [
                        ['Things', 'things'],
                        ['Collections', 'collections'],
                        ['Archive', 'archive']
                    ] }
                />
            </div>
            <div className={ classes.Description }>
                <div className={ classes.Label }>
                    <p>/description</p>
                </div>
                <p>A change strategy is characterised by a willingness to take risks, a need to show mastery, a need for
                    recognition and to achieve results. Ambitious ambitions and a thirst for influence sometimes lead to
                    revolutionary developments.</p>
            </div>
            <div className={ classes.Traits }>
                <div className={ classes.Label }>
                    <p>/attributes</p>
                </div>
                <ProfileTraits pairsTraits={ profile.profilePairsTraits }/>
            </div>
        </div>
    );
}

export default ProfileInfo;