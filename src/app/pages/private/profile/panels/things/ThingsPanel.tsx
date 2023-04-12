import React from 'react';
import CellList from '../../../../../components/cell-list/CellList';
import { Profile } from '../../../../../models/Profile';

interface ThingsPanelProps {
    profile: Profile;
}

function ThingsPanel({ profile }: ThingsPanelProps) {
    return <CellList profile={ profile }/>;
}

export default ThingsPanel;