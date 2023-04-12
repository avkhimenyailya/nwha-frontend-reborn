import React, { useEffect, useState } from 'react';
import classes from './CellSkeleton.module.css';

import EmptyCell from './empty/EmptyCell';

import { ProfileTask } from '../../models/ProfileTask';
import { useTitle } from './hooks/cellTitleHook';
import { useDescription } from './hooks/cellDescrHook';
import { useAppSelector } from '../../store/store';
import FilledCell from './filled/FilledCell';
import CellModal from './modal/CellModal';
import { Thing } from '../../models/Thing';
import { Answer } from '../../models/Answer';

interface CellSkeletonProps {
    profileTask: ProfileTask;
}

function CellSkeleton({ profileTask }: CellSkeletonProps) {
    const [answers] = useState(new Map<number, Answer>()); // questionId <-> answer
    const [file, setFile] = useState<File | null>(null);
    const [thing, setThing] = useState<Thing | null>(profileTask.thing ?? null);
    const [thingDescr, setThingDescr] = useState<string>(profileTask.thing?.description ?? '');

    const authData = useAppSelector(state => state.auth.data);
    const [isPerson, setPersonFlag] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const title = useTitle(profileTask);
    const description = useDescription(profileTask);

    useEffect(() => {
        setPersonFlag(
            profileTask.profileId === authData?.profileId
        );
    }, [authData?.profileId, profileTask]);

    function renderCell() {
        return profileTask.thing
            ? <FilledCell
                isPerson={ isPerson }
                setModalVisible={ setModalVisible }
                profileTask={ profileTask }/>
            : <EmptyCell
                isPerson={ isPerson }
                setModalVisible={ setModalVisible }
                profileTask={ profileTask }/>;
    }

    function renderCellModal() {
        return <CellModal
            answers={ answers }
            thing={ thing }
            setThing={ setThing }
            file={ file }
            setFile={ setFile }
            thingDescr={ thingDescr }
            setThingDescr={ setThingDescr }
            isPerson={ isPerson }
            profileTask={ profileTask }
            setModalVisible={ setModalVisible }/>;
    }

    return (
        <div className={ classes.CellSkeleton }>
            { (modalVisible && isPerson) && renderCellModal() }
            <div className={ classes.Cell }>
                { renderCell() }
            </div>
            <p className={ classes.CellTitle }>
                { title }
            </p>
            <p className={ classes.CellDescription }>
                { description }
            </p>
        </div>
    );
}

export default CellSkeleton;