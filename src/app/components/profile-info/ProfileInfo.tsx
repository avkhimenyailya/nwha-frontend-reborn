import React, { FC } from 'react';
import classes from './ProfileInfo.module.css';

interface ProfileInfoProps {

}

const ProfileInfo: FC<ProfileInfoProps> = ({}: ProfileInfoProps) => {
    return (
        <div className={ classes }>
            <p>This ProfileInfo component</p>
        </div>
    );
};

export default ProfileInfo;