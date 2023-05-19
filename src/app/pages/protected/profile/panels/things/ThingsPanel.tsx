import React from 'react';
import ProfileTaskList from '../../../../../components/cell-list/profile-task-list/ProfileTaskList';
import { ProfileTask } from '../../../../../models/ProfileTask';

interface ThingsPanelProps {
    profileTasks: ProfileTask[];
}

function ThingsPanel({ profileTasks }: ThingsPanelProps) {
    return <ProfileTaskList profileTasks={ profileTasks }/>;
}

export default ThingsPanel;