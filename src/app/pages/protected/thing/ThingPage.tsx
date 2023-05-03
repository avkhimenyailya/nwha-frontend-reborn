import React from 'react';
import classes from './ThingPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { thingApi } from '../../../store/api/thingApi';
import { collectionThingsApi } from '../../../store/api/collectionThingsApi';
import { profileApi } from '../../../store/api/profileApi';
import { usePrettyNumber } from '../../../hooks/usePrettyNumber';
import { profileTaskApi } from '../../../store/api/profileTaskApi';
import CellList from '../../../components/cell-list/CellList';
import CellSkeleton from '../../../components/cell-skeleton-reborn/CellSkeleton';
import Img from '../../../components/primitives/img/Img';

function ThingPage() {
    const { id } = useParams();
    const { getPrettyNumber } = usePrettyNumber();

    const {
        data: thing,
        isSuccess: thingSuccess
    } = thingApi.useFetchThingByIdQuery(Number(id));

    const {
        data: ownerProfile,
        isSuccess: ownerProfileSuccess
    } = profileApi.useFetchProfileByIdQuery(thing?.profileId, { skip: !thing });

    const {
        data: countCollectionsByThing,
        isSuccess: countCollectionsByThingSuccess
    } = collectionThingsApi.useFetchCountCollectionsByThingIdQuery(thing?.id, { skip: !thing });

    const {
        data: profileTaskByThing,
        isSuccess: profileTaskByThingSuccess
    } = profileTaskApi.useFetchProfileTaskByIdQuery(thing?.profileTaskId, { skip: !thing });

    const {
        data: randomThingsByTask,
        isSuccess: randomThingsByTaskSuccess
    } = thingApi.useFetchRandomThingQuery({ limit: 8, taskOrdinalNumber: thing?.taskOrdinalNumber }, { skip: !thing });

    return (
        <div className={ classes.ThingPage }>
            <div className={ classes.TopContainer }>
                { thingSuccess && <div className={ classes.Image }>
                    <Img imgUrl={ thing.fileUrl }/>
                </div> }
                { (thingSuccess && profileTaskByThing && ownerProfile) && <div className={ classes.ThingInfo }>
                    <div className={ classes.ThingInfoTopContainer }>
                        <p id={ 'w' } className={ classes.ThingTitle }>
                            { `${ getPrettyNumber(thing.taskOrdinalNumber!) } – ${ getPrettyNumber(thing.id!) }` }
                        </p>
                        <p className={ classes.EditThingButton }>
                            { `[edit task]` }
                        </p>
                    </div>
                    <p className={ classes.TaskDescription }>
                        { `${ profileTaskByThing.task.description.replaceAll('%%%', ' ') }` }
                    </p>
                    <p className={ classes.ThingDescription }>
                        { `${ thing.description ?? 'no description yet' }` }
                    </p>
                    <p id={ 'w' } className={ classes.ThingAddedDate }>
                        { `date: ${ thing.addedDate }` }
                    </p>
                    <p id={ 'w' } className={ classes.CountCollectionsByThing }>
                        { `collected: ${ countCollectionsByThing }` }
                    </p>
                    <p id={ 'w' } className={ classes.OwnerProfile }>{ `owner: ` }
                        <Link to={ `/${ ownerProfile.username }` }>
                            <span className={ classes.OwnerProfileUsername }>
                                { `@${ ownerProfile.username }` }
                            </span>
                        </Link>
                    </p>
                </div> }
            </div>
            <div className={ classes.BottomContainer }>
                { profileTaskByThingSuccess && <p className={ classes.LabelThingList }>
                    { `/other things for Task ${ profileTaskByThing.task.ordinalNumber }` }
                </p> }
                { randomThingsByTaskSuccess && <div className={ classes.RandomThingsList }>
                    <CellList>
                        { randomThingsByTask
                            .map(thing => <CellSkeleton
                                key={ thing.id }
                                thing={ thing }
                            />) }
                        { [...Array(24 - randomThingsByTask.length)]
                            .map(index => <CellSkeleton
                                extraTitle={ '#' }
                                key={ index }
                                foreign={ true }
                                lock={ true }
                            />) }
                    </CellList>
                </div> }
            </div>
        </div>
    );
}

export default ThingPage;