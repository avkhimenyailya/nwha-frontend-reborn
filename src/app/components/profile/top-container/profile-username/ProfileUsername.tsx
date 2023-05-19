import React from 'react';

interface ProfileUsernameProps {
    username: string;
}

function ProfileUsername({ username }: ProfileUsernameProps) {
    return (
        <div>
            <p>@{ username }</p>
        </div>
    );
}

export default ProfileUsername;