import React from 'react';
import classes from './ReplaceArchiveThingModal.module.css';
import {usePrettyNumber} from '../../../hooks/usePrettyNumber';
import Button from '../../primitives/buttons/button /Button';
import {Thing} from "../../../models/Thing";
import {thingApi} from "../../../store/api/thingApi";
import ModalSkeleton from "../modal-skeleton/ModalSkeleton";
import CellList from "../../cell-list/CellList";
import CellSkeleton from "../../cell-skeleton-reborn/CellSkeleton";
import Svg from "../../primitives/svg/Svg";

interface ReplaceArchiveThingModalProps {
    actualThing: Thing;
    archiveThing: Thing;
    taskOrderNumber: number;

    setShowProfileTaskModal: (flag: boolean) => void;
}

function ReplaceArchiveThingModal(props: ReplaceArchiveThingModalProps) {
    const {getPrettyNumber} = usePrettyNumber();

    const [updateThing] = thingApi.useUpdateThingMutation();

    function getThingTitle(thing: Thing) {
        return `${getPrettyNumber(thing?.id!)} – ${getPrettyNumber(props.taskOrderNumber)}`;
    }

    function handleReplace() {
        const newActualThing = {...props.actualThing, archived: true};
        updateThing(newActualThing);

        const newArchiveThing = {...props.archiveThing, archived: false};
        updateThing(newArchiveThing);

        props.setShowProfileTaskModal(false);
    }

    return (
        <ModalSkeleton
            setModalVisible={props.setShowProfileTaskModal}
            buttons={[
                <Button onClick={handleReplace} value={'replace'}/>
            ]}>
            <div className={classes.DescriptionContainer}>
                <p className={classes.Description}>
                    {`This thing ${getThingTitle(props.actualThing)} will replace your current response to Task ${props.taskOrderNumber} Thing ${getThingTitle(props.archiveThing)} will be archived.`}
                </p>
            </div>
            <div className={classes.ReplaceArchiveThingContainer}>
                <div style={{marginBottom: '9px'}}>
                    <Svg path={require('./assets/top-arrow.light.svg').default}/>
                </div>
                <CellList>
                    <CellSkeleton thing={props.actualThing}/>
                    <CellSkeleton thing={props.archiveThing}/>
                </CellList>
                <div style={{marginTop: '0px'}}>
                    <Svg path={require('./assets/bottom-arrow.light.svg').default}/>
                </div>
            </div>
        </ModalSkeleton>
    );
}

export default ReplaceArchiveThingModal;