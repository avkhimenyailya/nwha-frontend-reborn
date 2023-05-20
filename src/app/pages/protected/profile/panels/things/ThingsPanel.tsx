import React from 'react';
import ProfileTaskList from '../../../../../components/cell-list/profile-task-list/ProfileTaskList';
import {ProfileTask} from '../../../../../models/ProfileTask';
import {Profile} from "../../../../../models/Profile";

interface ThingsPanelProps {
    ownerProfile: Profile;
    profileTasks: ProfileTask[];
}

function ThingsPanel(props: ThingsPanelProps) {
    return <ProfileTaskList ownerProfile={props.ownerProfile} profileTasks={props.profileTasks}/>;
}

export default ThingsPanel;