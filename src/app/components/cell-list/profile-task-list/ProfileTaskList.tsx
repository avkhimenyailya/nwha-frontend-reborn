import React, {useState} from 'react';
import classes from './ProfileTaskList.module.css';
import {ProfileTask} from '../../../models/ProfileTask';
import CellList from "../CellList";
import CellSkeleton from "../../cell-skeleton-reborn/CellSkeleton";
import CollectionThingsModal3 from "../../modal/collection-modal3/CollectionThingsModal3";
import ProfileTaskModalFuture from "../../modal/profile-task-modal-future/ProfileTaskModalFuture";
import {Profile} from "../../../models/Profile";
import ContextMenu from "../../contex-menu/ContextMenu";
import SmallButton from "../../primitives/buttons/small-button/SmallButton";
import {useAppSelector} from "../../../store/store";

/* Настраивает CellList */
interface ProfileTaskListProps {
    ownerProfile: Profile;
    profileTasks: ProfileTask[];
}

function ProfileTaskList(props: ProfileTaskListProps) {
    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    return <div className={classes.ProfileTaskList}>
        <CellList>
            {props
                .profileTasks
                .filter(pt => pt.task.ordinalNumber !== 0)
                .map(pt => <ProfileTaskCell
                    key={pt.id}
                    profileTask={pt}
                    ownerProfile={props.ownerProfile}
                    isForeign={principalProfileId !== props.ownerProfile.id}
                />)}
        </CellList>
    </div>
}

function ProfileTaskCell(props: { key: number, isForeign: boolean, ownerProfile: Profile, profileTask: ProfileTask }) {
    const [colThingsModalVisible, setColThingsModalVisible] = useState(false);
    const [profileTaskModalVisible, setProfileTaskModalVisible] = useState(false);

    return (
        <>
            {colThingsModalVisible &&
                <CollectionThingsModal3
                    thing={props.profileTask.thing!}
                    ownerProfile={props.ownerProfile}
                    setModalVisible={setColThingsModalVisible}/>}
            {profileTaskModalVisible &&
                <ProfileTaskModalFuture
                    profileTask={props.profileTask}
                    setModalVisible={setProfileTaskModalVisible}/>}

            <CellSkeleton
                key={props.key}
                contextMenu={<ContextMenu>
                    {props.isForeign
                        ? <SmallButton onClick={() => setColThingsModalVisible(true)} value={'collect'}/>
                        : <SmallButton onClick={() => setProfileTaskModalVisible(true)} value={'edit'}/>}
                </ContextMenu>}
                foreign={props.isForeign}
                thing={props.profileTask.thing}
                extraTitle={props.profileTask.thing ? undefined : `Task ${props.profileTask.task.ordinalNumber}`}
                task={props.profileTask.task}
                description={props.profileTask.task.description}
                handleAddButton={() => setProfileTaskModalVisible(true)}
            />
        </>
    );
}

export default ProfileTaskList;