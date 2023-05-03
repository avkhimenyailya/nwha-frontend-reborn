import React, { useState } from 'react';
import classes from './ProfileTaskList.module.css';
import { ProfileTask } from '../../../models/ProfileTask';
import CellList from '../CellList';
import CellSkeleton from '../../cell-skeleton-reborn/CellSkeleton';
import { useAppSelector } from '../../../store/store';
import ContextMenu from '../../contex-menu/ContextMenu';
import SmallButton from '../../primitives/buttons/small-button/SmallButton';
import Modal from '../../modal/Modal';
import { Answer } from '../../../models/Answer';
import ProfileTaskModal from '../../modal/profile-task-modal/ProfileTaskModal';
import CollectionThingsModal from '../../modal/collection-modal-2/CollectionThingsModal';
import { usePrettyNumber } from '../../../hooks/usePrettyNumber';

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

    const { getPrettyNumber } = usePrettyNumber();

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
            setShowContextMenu={ setShowContextMenu }>
            { isForeign(profileTask.profileId)
                ? <SmallButton value={ 'collect' } onClick={ _ => collect(profileTask) }/>
                : <SmallButton value={ 'edit' } onClick={ _ => edit(profileTask) }/> }
        </ContextMenu>;
    }

    function isForeign(profileId: number) {
        return !(profileId === currentProfileId);
    }

    function save() {

    }

    function renderProfileTaskModal() {
        return showProfileTaskModal && <Modal
            setModalVisible={ setShowProfileTaskModal }
            disableButton={ false }
            onClickSave={ save }>
            <ProfileTaskModal
                profileTask={ currentProfileTask! }
                setShowProfileTaskModal={ setShowProfileTaskModal }
            />
        </Modal>;
    }

    function renderCollectionThingModal() {
        return showCollectionThingModal && <Modal
            setModalVisible={ setShowCollectionThingModal }
            disableButton={ false }
            onClickSave={ save }>
            <CollectionThingsModal
                profileTask={ currentProfileTask! }
                modalVisible={ setShowCollectionThingModal }
            />
        </Modal>;
    }

    return (
        <div className={ classes.ProfileTaskList }>
            { renderProfileTaskModal() }
            { renderCollectionThingModal() }
            <CellList>
                { props
                    .profileTasks
                    .filter(pt => pt.task.ordinalNumber !== 0)
                    .map(pt =>
                        <CellSkeleton
                            key={ pt.id }
                            thing={ pt.thing }
                            foreign={ isForeign(pt.profileId) }
                            description={ pt.task.description }
                            extraTitle={ !pt.thing ? getPrettyNumber(pt.task.ordinalNumber) : undefined }
                            contextMenu={ getContextMenu(pt) }
                            handleAddButton={ _ => edit(pt) }
                        />)
                }
            </CellList>
        </div>
    );
}

export default ProfileTaskList;