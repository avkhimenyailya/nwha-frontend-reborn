import React from 'react';
import classes from './ReplaceArchiveThingModal.module.css';
import Svg from '../../primitives/svg/Svg';
import { Thing } from '../../../models/Thing';
import CellSkeleton from '../../cell-skeleton-reborn/CellSkeleton';
import CellList from '../../cell-list/CellList';
import { usePrettyNumber } from '../../../hooks/usePrettyNumber';
import Button from '../../primitives/buttons/button /Button';
import { thingApi } from '../../../store/api/thingApi';

interface ReplaceArchiveThingModalProps {
    actualThing: Thing;
    archiveThing: Thing;

    setShowProfileTaskModal: (flag: boolean) => void;
}

function ReplaceArchiveThingModal(props: ReplaceArchiveThingModalProps) {
    const { getPrettyNumber } = usePrettyNumber();

    const [updateThing] = thingApi.useUpdateThingMutation();

    function getThingTitle(thing: Thing) {
        return `${ getPrettyNumber(thing?.id!) } – ${ getPrettyNumber(thing?.taskOrdinalNumber!) }`;
    }


    function renderButton() {
        return <div
            className={ classes.ReplaceButton }>
            <Button
                value={ 'replace' }
                onClick={ () => {
                    const newActualThing = { ...props.actualThing, archived: true };
                    updateThing(newActualThing);

                    const newArchiveThing = { ...props.archiveThing, archived: false };
                    updateThing(newArchiveThing);

                    props.setShowProfileTaskModal(false);
                } }
            />
        </div>;
    }

    return (
        <div className={ classes.ReplaceArchiveThingModal }>
            <div className={ classes.ModalWrap }>
                <div className={ classes.DescriptionContainer }>
                    <p className={ classes.Description }>
                        { `This thing ${ getThingTitle(props.actualThing) } will replace your current response to Task ${ props.archiveThing.taskOrdinalNumber }. Thing ${ getThingTitle(props.archiveThing) } will be archived.` }
                    </p>
                </div>
                <div className={ classes.ReplaceArchiveThingContainer }>
                    <div style={ { marginBottom: '9px' } }>
                        <Svg path={ require('./assets/top-arrow.light.svg').default }/>
                    </div>
                    <CellList>
                        <CellSkeleton thing={ props.actualThing }/>
                        <CellSkeleton thing={ props.archiveThing }/>
                    </CellList>
                    <div style={ { marginTop: '6px' } }>
                        <Svg path={ require('./assets/bottom-arrow.light.svg').default }/>
                    </div>
                </div>
            </div>
            { renderButton() }
        </div>
    );
}

export default ReplaceArchiveThingModal;