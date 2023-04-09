import React from 'react';
import ThingCellList from '../../../../../components/thing-cell-list/ThingCellList';
import { Profile } from '../../../../../models/Profile';

interface ThingsPanelProps {
    profile: Profile;
}

function ThingsPanel(props: ThingsPanelProps) {

    console.log('ThingsPanel: ', props.profile?.profileTasks);

    return (
        <div>
            <ThingCellList profile={ props.profile }/>
        </div>
    );
}

export default ThingsPanel;