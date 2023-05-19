import React, {useState} from 'react';
import classes from './ArchivePanel.module.css';
import {Task} from '../../../../../models/Task';
import {Thing} from '../../../../../models/Thing';
import ContextMenu from '../../../../../components/contex-menu/ContextMenu';
import SmallButton from '../../../../../components/primitives/buttons/small-button/SmallButton';
import Modal from '../../../../../components/modal/Modal';
import ReplaceArchiveThingModal
    from '../../../../../components/modal/replace-archive-thing-modal/ReplaceArchiveThingModal';
import {profileTaskApi} from '../../../../../store/api/profileTaskApi';
import {thingApi} from '../../../../../store/api/thingApi';
import {usePrettyNumber} from '../../../../../hooks/usePrettyNumber';
import CellList from '../../../../../components/cell-list/CellList';
import CellSkeleton from '../../../../../components/cell-skeleton-reborn/CellSkeleton';

interface ArchivePanelProps {
    allTasks: Task[],
    archivedThings: Thing[]
}

function ArchivePanel(props: ArchivePanelProps) {
    const [currentThings, setCurrentThings] = useState<{ actualThing: Thing, archiveThing: Thing }>();
    const [replaceArchiveThingModalVisible, setReplaceArchiveThingModalVisible] = useState(false);

    const [trigger] = profileTaskApi.useLazyFetchProfileTaskByIdQuery();
    const [updateThing] = thingApi.useUpdateThingMutation();

    const {getPrettyNumber} = usePrettyNumber();

    function recoveryThing(thing: Thing) {
        trigger(thing.profileTaskId)
            .unwrap()
            .then(resp => {
                if (resp.thing) {
                    setCurrentThings({actualThing: resp.thing, archiveThing: thing});
                    setReplaceArchiveThingModalVisible(true);
                } else {
                    const newThing = {...thing, archived: false};
                    updateThing(newThing);
                }
            });
    }

    function deleteThing() {

    }

    function renderReplaceArchiveThingModal() {
        return replaceArchiveThingModalVisible && <Modal
            setModalVisible={setReplaceArchiveThingModalVisible}
            disableButton={false}
            onClickSave={_ => console.log('')}>
            <ReplaceArchiveThingModal
                archiveThing={currentThings?.archiveThing!}
                actualThing={currentThings?.actualThing!}
                setShowProfileTaskModal={setReplaceArchiveThingModalVisible}
            />
        </Modal>;
    }

    function getContextMenu(thing: Thing) {
        return <ContextMenu>
            <SmallButton onClick={_ => recoveryThing(thing)} value={'restore'}/>
            <SmallButton disabled={true} onClick={_ => deleteThing} value={'delete'}/>
        </ContextMenu>;
    }

    function renderSortedByTaskCellList(key: number, task: Task) {
        return <div key={key} className={classes.SortedByTaskCellList}>
            <p id={'w'} style={{marginBottom: '12px'}}>
                {`${getPrettyNumber(task.ordinalNumber)}. ${task.description}`.replaceAll('%%%', ' ')}
            </p>
            <CellList key={key}>
                {props.archivedThings.filter(t => t.taskOrdinalNumber === task.ordinalNumber).map((thing, i) =>
                    <CellSkeleton key={i}
                                  contextMenu={getContextMenu(thing)}
                                  thing={thing}
                                  remark={'(archived)'}/>
                )}
                {[...Array(8 - props.archivedThings.filter(t => t.taskOrdinalNumber === task.ordinalNumber).length)]
                    .map(index => <CellSkeleton
                        key={index}
                        extraTitle={'#'}
                        foreign={true}
                        lock={true}
                    />)}
            </CellList>
        </div>;
    }

    return (
        <div>
            {renderReplaceArchiveThingModal()}
            {props.allTasks.filter(t => t.ordinalNumber !== 0).map((task, i) => <div key={i}
                                                                                     className={classes.SortedByTaskCellList}>
                <p id={'w'} style={{marginBottom: '12px'}}>
                    {`${getPrettyNumber(task.ordinalNumber)}. ${task.description}`.replaceAll('%%%', ' ')}
                </p>
                <CellList key={i}>
                    {props.archivedThings.filter(t => t.taskOrdinalNumber === task.ordinalNumber).map((thing, i) =>
                        <CellSkeleton key={i}
                                      contextMenu={getContextMenu(thing)}
                                      thing={thing}
                                      remark={'(archived)'}/>
                    )}
                    {[...Array(8 - props.archivedThings.filter(t => t.taskOrdinalNumber === task.ordinalNumber).length)]
                        .map((index) => <CellSkeleton
                            key={index}
                            extraTitle={'#'}
                            foreign={true}
                            lock={true}
                        />)}
                </CellList>
            </div>)}
        </div>
    );
}

export default ArchivePanel;


