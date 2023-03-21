import React, { FC } from 'react';

interface ProfileDescriptionProps {
    description?: string;
}

const ProfileDescription: FC<ProfileDescriptionProps> = ({ description }: ProfileDescriptionProps) => {
    return (
        <p style={ { maxWidth: '372px', wordWrap: 'break-word' } }>
            { description }
        </p>
    );
};

export default ProfileDescription;