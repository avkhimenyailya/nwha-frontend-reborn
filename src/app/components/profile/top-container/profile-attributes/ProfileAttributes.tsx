import React, {FC} from 'react';
import classes from './ProfileAttributes.module.css';
import {ProfileAttribute} from '../../../../models/ProfileAttribute';

interface ProfileAttributesProps {
    profileAttributes: ProfileAttribute[];
}

export const AttributeItem: FC<any> = ({name, value}) => (
    <div className={classes.AttributeItem}>
        <div className={classes.AttributeName}>
            <p>{name}</p>
        </div>
        <div className={classes.AttributeValue}>
            <p>{value}%</p>
        </div>
    </div>
);

function ProfileAttributes({profileAttributes}: ProfileAttributesProps) {
    return (
        <div className={classes.ProfileAttributes}>
            {profileAttributes.map(profileAttribute =>
                <AttributeItem
                    key={profileAttribute.attributeName}
                    name={profileAttribute.attributeName}
                    value={profileAttribute.value}
                />
            )}
        </div>
    );
}

export default ProfileAttributes;