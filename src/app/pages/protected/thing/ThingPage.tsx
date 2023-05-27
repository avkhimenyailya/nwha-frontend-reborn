import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import classes from './ThingPage.module.scss';
import {Link, useLocation, useParams} from "react-router-dom";
import {thingApi} from "../../../store/api/thingApi";
import Loading from "../../../components/loading/Loading";
import {usePrettyNumber} from "../../../hooks/usePrettyNumber";
import {profileTaskApi} from "../../../store/api/profileTaskApi";
import {profileApi} from "../../../store/api/profileApi";
import {Profile} from "../../../models/Profile";
import Button from "../../../components/primitives/buttons/button /Button";
import CellSkeleton from "../../../components/cell-skeleton-reborn/CellSkeleton";
import CellList from "../../../components/cell-list/CellList";
import Img from "../../../components/img/Img";
import CollectionThingsModal3 from "../../../components/modal/collection-modal3/CollectionThingsModal3";
import {useAppSelector} from "../../../store/store";
import ProfileTaskModalFuture from "../../../components/modal/profile-task-modal-future/ProfileTaskModalFuture";
import {ProfileTask} from "../../../models/ProfileTask";
import {Thing} from "../../../models/Thing";

function ThingPage() {
    const {id} = useParams()
    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const {
        data: thing,
        isLoading: thingLoading,
        isError: thingError
    } = thingApi.useFetchThingByIdQuery(Number(id))

    const {
        data: profileTask,
        isLoading: profileTaskLoading,
        isError: profileTaskError
    } = profileTaskApi.useFetchProfileTaskByIdQuery(thing?.profileTaskId!, {skip: !thing})

    const {
        data: owner,
        isLoading: ownerLoading,
        isError: ownerError
    } = profileApi.useFetchProfileByIdQuery(profileTask?.profileId, {skip: !profileTask})

    const {
        data: thingByTaskOrdinalNumber,
        isLoading: thingByTaskOrdinalNumberLoading,
        isError: thingByTaskOrdinalNumberError
    } = thingApi.useFetchThingsByTaskIdQuery(profileTask?.task?.id!, {skip: !profileTask})

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [id]);

    if (thingLoading || profileTaskLoading || ownerLoading || thingByTaskOrdinalNumberLoading) return <Loading/>
    if (thingError) return <p>Thing not found</p>
    if (profileTaskError) return <p>Task not found</p>
    if (ownerError) return <p>Owner (profile) not found</p>
    if (thingByTaskOrdinalNumberError) return <p>Thing by task ordinal number not found</p>

    return (
        <div className={classes.thing_page}>
            <div className={classes.thing_page_content}>
                <Img className={classes.thing_page_content_picture} src={thing!.pictureLink!}/>
                <LeftContainer
                    thing={thing!}
                    profileTask={profileTask!}
                    owner={owner!}
                />
            </div>
            <div className={classes.thing_page_similar_things}>
                <p className={classes.thing_page_similar_things_label}>
                    {`/other things for Task ${profileTask?.task.ordinalNumber}`}
                </p>
                <CellList>
                    {thingByTaskOrdinalNumber!
                        .filter(t => t.profileTaskId !== principalProfileId)
                        .map(t =>
                            <CellSkeleton
                                key={t.id}
                                thing={t}
                                task={profileTask?.task}
                            />
                        )}
                    {[...Array(25 - thingByTaskOrdinalNumber!.length)]
                        .map((value, index) => <CellSkeleton
                            key={index + 24}
                            extraTitle={'#'}
                            foreign={true}
                            lock={true}
                        />)}
                </CellList>
            </div>
        </div>
    )
}

function LeftContainer(props: { thing: Thing, profileTask: ProfileTask, owner: Profile }) {
    const {getPrettyNumber} = usePrettyNumber();

    const [colThingsModalVisible, setColThingsModalVisible] = useState(false);
    const [profileTaskModalVisible, setProfileTaskModalVisible] = useState(false);

    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    return (
        <div className={classes.thing_page_content_left_container}>
            {colThingsModalVisible &&
                <CollectionThingsModal3
                    thing={props.profileTask.thing!}
                    ownerProfile={props.owner}
                    setModalVisible={setColThingsModalVisible}/>}
            {profileTaskModalVisible &&
                <ProfileTaskModalFuture profileTask={props.profileTask} setModalVisible={setProfileTaskModalVisible}/>}
            <div className={classes.thing_page_content_thing_info}>
                <p className={[classes.thing_page_content_left_container_thing_info_thing_title, 'highlight'].join(' ')}>
                    {`${getPrettyNumber(props.profileTask.thing?.id!)} – ${getPrettyNumber(props.profileTask.task.ordinalNumber!)}`}
                </p>
                <p className={classes.thing_page_content_left_container_thing_info_task_description}>
                    {props.profileTask.task.description.replaceAll('%%%', ' ')}
                </p>
                <p className={classes.thing_page_content_left_container_thing_info_thing_description}>
                    {props.profileTask.thing?.description ?? 'no description yet'}
                </p>
                <p className={[classes.thing_page_content_left_container_thing_info_thing_add_date, 'highlight'].join(' ')}>
                    date: {props.profileTask.thing?.addDate}
                </p>
                <p className={[classes.thing_page_content_left_container_thing_info_thing_col_amount, 'highlight'].join(' ')}>
                    collected: {props.thing.amountCollections}
                </p>
                <p className={[classes.thing_page_content_left_container_thing_info_thing_owner, 'highlight'].join(' ')}>
                    {'owner: '}
                    <Link to={`/${props.owner.username}`}>
                        <span className="link">@{`${props.owner.username}`}</span>
                    </Link>
                </p>
            </div>
            <div className={classes.thing_page_content_thing_info_col_button}>
                {
                    principalProfileId !== props.owner.id &&
                    <Button onClick={() => setColThingsModalVisible(true)} value={'collect'}/>
                }
            </div>
        </div>
    )
}

export default ThingPage;