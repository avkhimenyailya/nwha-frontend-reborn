import React, { useEffect, useState } from 'react';
import classes from './ProfileTaskList.module.css';
import { ProfileTask } from '../../../models/ProfileTask';
import CellList from '../CellList';
import CellSkeleton from '../../cell-skeleton-reborn/CellSkeleton';
import { useAppSelector } from '../../../store/store';
import ContextMenu from '../../contex-menu/ContextMenu';
import SmallButton from '../../primitives/buttons/small-button/SmallButton';
import Modal from '../../modal/Modal';
import ProfileTaskModal from '../../modal/profile-task-modal/ProfileTaskModal';
import { Answer } from '../../../models/Answer';
import { profileTaskApi } from '../../../store/api/profileTaskApi';

/* Настраивает CellList */
interface ProfileTaskListProps {
    profileTasks: ProfileTask[];
}

function ProfileTaskList(props: ProfileTaskListProps) {
    const [answers, setAnswers] = useState(new Map<number, Answer>());
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const currentProfileId =
        useAppSelector(state => state.authSlice.data?.profileId);

    const [profileTaskModalVisible, setProfileTaskModalVisible] = useState(false);

    const [currentProfileTask, setCurrentProfileTask] = useState<ProfileTask>();

    const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersMutation();


    function edit(profileTask: ProfileTask) {
        setCurrentProfileTask(profileTask);
        setProfileTaskModalVisible(true);


    }

    function collect(profileTask: ProfileTask) {
        alert('Коллекции еще в разработке ¯\\_( ಥ︠ ⏥ ︡ಥ)_/¯');
    }

    function getPrettyCellTitle(profileTask: ProfileTask) {
        return (profileTask.task.ordinalNumber > 9
            ? String(profileTask.task.ordinalNumber)
            : '0' + profileTask.task.ordinalNumber);
    }

    function getContextMenu(profileTask: ProfileTask) {
        return <ContextMenu>
            { isForeign(profileTask.profileId)
                ? <SmallButton value={ 'collect' } onClick={ _ => collect(profileTask) }/>
                : <SmallButton value={ 'edit' } onClick={ _ => edit(profileTask) }/> }
        </ContextMenu>;
    }

    function isForeign(profileId: number) {
        return !(profileId === currentProfileId);
    }

    function saveCurrentProfileTask() {

    }

    function renderProfileTaskModal() {
        return profileTaskModalVisible &&
            <Modal
                onClickSave={ () => saveCurrentProfileTask() }
                setModalVisible={ setProfileTaskModalVisible }
                disableButton={ disableSaveButton }>
                <ProfileTaskModal
                    answers={ answers }
                    setAnswers={ setAnswers }
                    setDisableButton={ setDisableSaveButton }
                    profileTask={ currentProfileTask! }
                />
            </Modal>;
    }

    return (
        <div className={ classes.ProfileTaskList }>
            { renderProfileTaskModal() }
            <CellList>
                { props
                    .profileTasks
                    .filter(pt => pt.task.ordinalNumber !== 0)
                    .map(pt =>
                        <CellSkeleton
                            thing={ pt.thing }
                            foreign={ isForeign(pt.profileId) }
                            description={ pt.task.description }
                            cellTitle={ getPrettyCellTitle(pt) }
                            contextMenu={ getContextMenu(pt) }
                            handleAddButton={ _ => edit(pt) }
                        />)
                }
            </CellList>
        </div>
    );
}

export default ProfileTaskList;