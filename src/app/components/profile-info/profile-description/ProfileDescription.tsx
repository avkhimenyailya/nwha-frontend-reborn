import React, { FC } from 'react';

interface ProfileDescriptionProps {
    text?: string;
}

const ProfileDescription: FC<ProfileDescriptionProps> = ({ text }: ProfileDescriptionProps) => {
    return (
        <p style={ { maxWidth: '372px' } }>
            { text }
        </p>
    );
};

export default ProfileDescription;