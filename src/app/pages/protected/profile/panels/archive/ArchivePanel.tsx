import React, {useState} from 'react';
import classes from './ArchivePanel.module.scss'
import {Task} from '../../../../../models/Task';
import {Thing} from "../../../../../models/Thing";
import {usePrettyNumber} from "../../../../../hooks/usePrettyNumber";
import CellList from "../../../../../components/cell-list/CellList";
import CellSkeleton from "../../../../../components/cell-skeleton-reborn/CellSkeleton";
import ReplaceArchiveThingModal
    from "../../../../../components/modal/replace-archive-thing-modal/ReplaceArchiveThingModal";
import {profileTaskApi} from "../../../../../store/api/profileTaskApi";
import {thingApi} from "../../../../../store/api/thingApi";
import ContextMenu from "../../../../../components/contex-menu/ContextMenu";
import SmallButton from "../../../../../components/primitives/buttons/small-button/SmallButton";

interface ArchivePanelProps {
    allTasks: Task[],
    archivedThings: Thing[]
}

function ArchivePanel(props: ArchivePanelProps) {
    return (
        <div className={classes.archive_panel}>
            {props.allTasks.filter(task => task.ordinalNumber !== 0).map(task => {
                return <ArchiveThingByTaskList
                    task={task}
                    archivedThings={props.archivedThings.filter(t => t.taskId === task.id)}
                />
            })}
        </div>
    )
}

function ArchiveThingByTaskList(props: { task: Task, archivedThings: Thing[] }) {
    const {getPrettyNumber} = usePrettyNumber();

    return <div className={classes.archive_thing_by_task_list}>
        <p className={[classes.label, "highlight"].join(' ')}>
            {getPrettyNumber(props.task.ordinalNumber) + '. ' + props.task.description.replaceAll('%%%', ' ')}
        </p>
        <CellList>
            {props.archivedThings.map(thing => <ArchiveThing task={props.task} thing={thing}/>)}
            {
                [...Array(8 - props.archivedThings.length)].map(index =>
                    <CellSkeleton
                        key={index}
                        lock={true}
                        foreign={true}
                        extraTitle={'#'}
                    />)
            }
        </CellList>
    </div>
}

function ArchiveThing(props: { task: Task, thing: Thing }) {
    const [
        currentThings,
        setCurrentThings
    ] = useState<{ actualThing: Thing, archiveThing: Thing }>();

    const [
        replaceArchiveThingModalVisible,
        setReplaceArchiveThingModalVisible
    ] = useState(false);

    const [trigger] = profileTaskApi.useLazyFetchProfileTaskByIdQuery();
    const [updateThing] = thingApi.useUpdateThingMutation();

    function handleRestore() {
        trigger(props.thing.profileTaskId)
            .unwrap()
            .then(resp => {
                if (resp.thing) {
                    setCurrentThings({actualThing: resp.thing, archiveThing: props.thing});
                    setReplaceArchiveThingModalVisible(true);
                } else {
                    const newThing = {...props.thing, archived: false};
                    updateThing(newThing);
                }
            });
    }

    function handleDelete() {
        updateThing({...props.thing, removed: true})
    }

    return <>
        {replaceArchiveThingModalVisible &&
            <ReplaceArchiveThingModal
                actualThing={currentThings?.actualThing!}
                archiveThing={currentThings?.archiveThing!}
                taskOrderNumber={props.task.ordinalNumber}
                setShowProfileTaskModal={setReplaceArchiveThingModalVisible}
            />
        }
        <CellSkeleton
            remark={'(archived)'}
            thing={props.thing}
            contextMenu={<ContextMenu>
                <SmallButton onClick={handleRestore} value={'restore'}/>
                <SmallButton onClick={handleDelete} value={'delete'}/>
            </ContextMenu>}
        />
    </>
}

export default ArchivePanel;