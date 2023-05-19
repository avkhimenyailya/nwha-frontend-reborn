import React, {useEffect, useState} from 'react';
import classes from './ThingPage.module.css';
import {Link, useParams} from 'react-router-dom';
import {thingApi} from '../../../store/api/thingApi';
import {profileApi} from '../../../store/api/profileApi';
import {usePrettyNumber} from '../../../hooks/usePrettyNumber';
import {profileTaskApi} from '../../../store/api/profileTaskApi';
import CellList from '../../../components/cell-list/CellList';
import CellSkeleton from '../../../components/cell-skeleton-reborn/CellSkeleton';
import Img from '../../../components/primitives/img/Img';
import StringButton from '../../../components/primitives/buttons/string-button/StringButton';
import {useAppSelector} from '../../../store/store';
import CollectionThingsModal3 from '../../../components/modal/collection-modal3/CollectionThingsModal3';
import Loading from "../../../components/loading/Loading";

function ThingPage() {
    const {id} = useParams();
    const {getPrettyNumber} = usePrettyNumber();
    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const {
        data: thing,
        isSuccess: thingSuccess,
        isError
    } = thingApi.useFetchThingByIdQuery(Number(id));

    const {
        data: ownerProfile,
        isSuccess: ownerProfileSuccess
    } = profileApi.useFetchProfileByIdQuery(thing?.profileId!, {skip: !thing});

    const {
        data: profileTaskByThing,
        isSuccess: profileTaskByThingSuccess
    } = profileTaskApi.useFetchProfileTaskByIdQuery(thing?.profileTaskId!, {skip: !thing});

    const [trigger, {
        data: randomThingsByTask,
        isSuccess: randomThingsByTaskSuccess,
        isLoading
    }] = thingApi.useLazyFetchRandomThingQuery();

    const [showProfileTaskModal, setShowProfileTaskModal] = useState(false); // todo
    const [showCollectionThingModal, setShowCollectionThingModal] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
        trigger({limit: 8, taskOrdinalNumber: thing?.taskOrdinalNumber})
    }, [id, thing?.taskOrdinalNumber, trigger]);

    if (isLoading) return <Loading/>
    if (isError) return <p>thing not found</p>
    return (
        <div className={classes.ThingPage}>
            {showCollectionThingModal &&
                <CollectionThingsModal3 thing={thing!} setModalVisible={setShowCollectionThingModal}/>}
            <div className={classes.TopContainer}>
                {thingSuccess && <div className={classes.Image}>
                    <Img url={thing.fileUrl}/>
                </div>}
                {(thingSuccess && profileTaskByThing && ownerProfile) && <div className={classes.ThingInfo}>
                    <div className={classes.ThingInfoTopContainer}>
                        <p id={'w'} className={classes.ThingTitle}>
                            {`${getPrettyNumber(thing.id!)} – ${getPrettyNumber(thing.taskOrdinalNumber!)}`}
                        </p>
                        {principalProfileId !== ownerProfile.id &&
                            <StringButton onClick={() => setShowCollectionThingModal(true)} value={'collect'}/>}
                    </div>
                    <p className={classes.TaskDescription}>
                        {`${profileTaskByThing.task.description.replaceAll('%%%', ' ')}`}
                    </p>
                    <p className={classes.ThingDescription}>
                        {`${thing.description ?? 'no description yet'}`}
                    </p>
                    <p id={'w'} className={classes.ThingAddedDate}>
                        {`date: ${thing.addedDate}`}
                    </p>
                    <p id={'w'} className={classes.CountCollectionsByThing}>
                        {`collected: infinity`}
                    </p>
                    <p id={'w'} className={classes.OwnerProfile}>{`owner: `}
                        <Link to={`/${ownerProfile.username}`}>
                            <span className={classes.OwnerProfileUsername}>
                                {`@${ownerProfile.username}`}
                            </span>
                        </Link>
                    </p>
                </div>}
            </div>
            <div className={classes.BottomContainer}>
                {profileTaskByThingSuccess && <p className={classes.LabelThingList}>
                    {`/other things for Task ${profileTaskByThing.task.ordinalNumber}`}
                </p>}
                {randomThingsByTaskSuccess && <div className={classes.RandomThingsList}>
                    <CellList>
                        {randomThingsByTask!
                            .filter(thing => thing.id !== Number(id))
                            .map(thing => <CellSkeleton
                                thing={thing}
                            />)}
                        {[...Array(24 - randomThingsByTask!.length)]
                            .map(_ => <CellSkeleton
                                extraTitle={'#'}
                                foreign={true}
                                lock={true}
                            />)}
                    </CellList>
                </div>}
            </div>
        </div>
    );
}

export default ThingPage;