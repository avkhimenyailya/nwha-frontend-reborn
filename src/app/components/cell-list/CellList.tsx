import React from 'react';
import classes from './CellList.module.css';
import CellSkeleton from '../cell-skeleton/CellSkeleton';
import { Profile } from '../../models/Profile';

interface ThingCellListProps {
    profile: Profile;
}

function CellList({ profile }: ThingCellListProps) {
    return (
        <div className={ classes.ThingCellList }>
            { profile.profileTasks.filter(p => p.task.id !== 1).map(p =>
                <CellSkeleton key={ p.id } profileTask={ p }/>) }
        </div>
    );
}

export default CellList;