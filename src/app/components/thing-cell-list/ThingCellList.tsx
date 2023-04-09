import React from 'react';
import classes from './ThingCellList.module.css';
import ThingSkeleton from '../thing-skeleton/ThingSkeleton';
import { Profile } from '../../models/Profile';

interface ThingCellListProps {
    profile: Profile;
}

function ThingCellList(props: ThingCellListProps) {
    console.log('ThingCellList: ', props.profile.profileTasks);

    return (
        <div className={ classes.ThingCellList }>
            {
                props.profile.profileTasks.filter(p => p.task.id !== 1).map(p =>
                    <ThingSkeleton key={ p.id } profileTask={ p }/>)
            }
        </div>
    );
}

export default ThingCellList;