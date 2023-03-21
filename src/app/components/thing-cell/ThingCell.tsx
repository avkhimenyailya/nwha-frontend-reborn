import React, { FC } from 'react';
import classes from './ThingCell.module.css';
import { Thing } from '../../models/Thing';
import { ProfileTask } from '../../models/ProfileTask';

interface ThingCellProps {
    item: Thing | ProfileTask;
}

const ThingCell: FC<ThingCellProps> = ({ item }: ThingCellProps) => {

    function isThing(obj: Thing | ProfileTask): obj is Thing {
        return (obj as Thing).id !== undefined;
    }

    return (
        <div className={ classes.container }>
            <p>This ThingCell component</p>
        </div>
    );
};

export default ThingCell;