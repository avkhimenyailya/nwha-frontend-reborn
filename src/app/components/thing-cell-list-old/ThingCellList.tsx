import React, { FC } from 'react';
import { Thing } from '../../models/Thing';
import { ProfileTask } from '../../models/ProfileTask';
import classes from './ThingCellList.module.css';

interface ThingCellsListProps {
    items: Thing[] | ProfileTask[];
}

const ThingCellList: FC<ThingCellsListProps> = ({ items }: ThingCellsListProps) => {

    return (
        <div className={ classes.container }>
            {/*{*/}
            {/*    items.map(item => {*/}
            {/*        if (isThing(item)) {*/}
            {/*            return <ThingCell thing={ item }/>;*/}
            {/*        } else {*/}
            {/*            const pt: ProfileTask = item as ProfileTask;*/}
            {/*            if (pt.thingId) {*/}
            {/*                let thing = things.find(thing => thing.id === pt.thingId);*/}
            {/*                return <ThingCell thing={ thing }/>;*/}
            {/*            } else {*/}
            {/*                return <ThingCell profileTask={ item }/>;*/}
            {/*            }*/}
            {/*        }*/}
            {/*    })*/}
            {/*}*/}
        </div>
    );
};

export default ThingCellList;