import React from 'react';
import { Profile } from '../../../../../models/Profile';
import ProfileTaskList from '../../../../../components/cell-list/profile-task-list/ProfileTaskList';

interface ThingsPanelProps {
    profile: Profile;
}

function ThingsPanel({ profile }: ThingsPanelProps) {
    return <ProfileTaskList profileTasks={ profile.profileTasks }/>;
}

export default ThingsPanel;