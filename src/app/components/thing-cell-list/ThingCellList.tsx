import React, { FC } from 'react';
import { Thing } from '../../models/Thing';
import { ProfileTask } from '../../models/ProfileTask';

interface ThingCellsListProps {
    items: Thing[] | ProfileTask[];
}

const ThingCellList: FC<ThingCellsListProps> = ({ items }: ThingCellsListProps) => {
    return (
        <div>
            <p>This ThingCellsList component</p>
        </div>
    );
};

export default ThingCellList;