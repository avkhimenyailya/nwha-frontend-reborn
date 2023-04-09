import React from 'react';
import classes from './ThingSkeleton.module.css';
import FilledThingCell from './cell-types/filled/FilledThingCell';
import { ProfileTask } from '../../models/ProfileTask';
import EmptyThingCell from './cell-types/empty/EmptyThingCell';

interface ThingSkeletonProps {
    profileTask: ProfileTask;
}

function ThingSkeleton({ profileTask }: ThingSkeletonProps) {

    function renderTitle() {
        function addZeroToBegin(number: number): string {
            if (String(number).length < 2) {
                return '0' + number;
            } else {
                return String(number);
            }
        }

        const result: string
            = addZeroToBegin(profileTask.task.ordinalNumber);
        if (profileTask.thing?.id) {
            return result + '-' + profileTask.thing.id;
        } else {
            return result;
        }
    }

    return (
        <div className={ classes.ThingSkeleton }>
            { profileTask.thing?.id
                ? <FilledThingCell profileTask={ profileTask }/>
                : <EmptyThingCell profileTask={ profileTask }/>
            }
            <p className={ classes.ThingTitle }>
                { renderTitle() }
            </p>
            <p className={ classes.ThingDescription }>
                { profileTask.task.description.split('(')?.[0] }
            </p>
        </div>
    );
}

export default ThingSkeleton;