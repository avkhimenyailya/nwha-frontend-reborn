import React, {useState} from 'react';
import classes from './ProfileTaskList.module.css';
import {ProfileTask} from '../../../models/ProfileTask';
import CellList from '../CellList';
import CellSkeleton from '../../cell-skeleton-reborn/CellSkeleton';
import {useAppSelector} from '../../../store/store';
import ContextMenu from '../../contex-menu/ContextMenu';
import SmallButton from '../../primitives/buttons/small-button/SmallButton';
import {Answer} from '../../../models/Answer';
import {usePrettyNumber} from '../../../hooks/usePrettyNumber';
import CollectionThingsModal3 from '../../modal/collection-modal3/CollectionThingsModal3';
import ProfileTaskModalFuture from "../../modal/profile-task-modal-future/ProfileTaskModalFuture";

/* Настраивает CellList */
interface ProfileTaskListProps {
    profileTasks: ProfileTask[];
}

export interface CurrentData {
    answers: Answer[];
    file: File;
}

function ProfileTaskList(props: ProfileTaskListProps) {
    const currentProfileId = useAppSelector(state => state.authSlice.data?.profileId);
    const [currentProfileTask, setCurrentProfileTask] = useState<ProfileTask>();

    const [showProfileTaskModal, setShowProfileTaskModal] = useState(false);
    const [showCollectionThingModal, setShowCollectionThingModal] = useState(false);

    const [showContextMenu, setShowContextMenu] = useState(false);

    const {getPrettyNumber} = usePrettyNumber();

    function edit(profileTask: ProfileTask) {
        setCurrentProfileTask(profileTask);
        setShowProfileTaskModal(true);
    }

    function collect(profileTask: ProfileTask) {
        setCurrentProfileTask(profileTask);
        setShowCollectionThingModal(true);
    }

    function getContextMenu(profileTask: ProfileTask) {
        return <ContextMenu
            setShowContextMenu={setShowContextMenu}>
            {isForeign(profileTask.profileId)
                ? <SmallButton value={'collect'} onClick={_ => collect(profileTask)}/>
                : <SmallButton value={'edit'} onClick={_ => edit(profileTask)}/>}
        </ContextMenu>;
    }

    function isForeign(profileId: number) {
        return !(profileId === currentProfileId);
    }

    function save() {

    }

    function renderProfileTaskModal() {
        return showProfileTaskModal &&
            <ProfileTaskModalFuture profileTask={currentProfileTask!} setModalVisible={setShowProfileTaskModal}/>
    }

    function renderCollectionThingModal() {
        return showCollectionThingModal &&
            <CollectionThingsModal3
                thing={currentProfileTask?.thing!}
                setModalVisible={setShowCollectionThingModal}
            />;
    }

    return (
        <div className={classes.ProfileTaskList}>
            {renderProfileTaskModal()}
            {renderCollectionThingModal()}
            <CellList>
                {props
                    .profileTasks
                    .filter(pt => pt.task.ordinalNumber !== 0)
                    .map(pt =>
                        <CellSkeleton
                            key={pt.id}
                            thing={pt.thing}
                            foreign={isForeign(pt.profileId)}
                            description={pt.task.description}
                            extraTitle={!pt.thing ? getPrettyNumber(pt.task.ordinalNumber) : undefined}
                            contextMenu={getContextMenu(pt)}
                            handleAddButton={_ => edit(pt)}
                        />)
                }
            </CellList>
        </div>
    );
}

export default ProfileTaskList;