import React, { FC } from 'react';
import { Thing } from '../../models/Thing';
import { ProfileTask } from '../../models/ProfileTask';
import classes from './ThingCellList.module.css';
import ThingCell from '../thing-cell/ThingCell';
import { things } from '../../mock-data/data';

interface ThingCellsListProps {
    items: Thing[] | ProfileTask[];
}

const ThingCellList: FC<ThingCellsListProps> = ({ items }: ThingCellsListProps) => {
    const isThing = (item: Thing | ProfileTask): item is Thing => {
        return (item as Thing).description !== undefined;
    };

    return (
        <div className={ classes.container }>
            {
                items.map(item => {
                    if (isThing(item)) {
                        return <ThingCell thing={ item }/>;
                    } else {
                        const pt: ProfileTask = item as ProfileTask;
                        if (pt.thingId) {
                            let thing = things.find(thing => thing.id === pt.thingId);
                            return <ThingCell thing={ thing }/>;
                        } else {
                            return <ThingCell profileTask={ item }/>;
                        }
                    }
                })
            }
        </div>
    );
};

export default ThingCellList;