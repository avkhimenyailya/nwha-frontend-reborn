import React, {useEffect, useState} from 'react';
import classes from './TodayPage.module.scss';
import {thingApi} from '../../../../store/api/thingApi';
import RecentlyAddedThings from '../../../../components/recently-added-things/RecentlyAddedThings';
import Loading from "../../../../components/loading/Loading";
import SmallThingCell from "../../../../components/small-thing-cell-reborn/SmallThingCell";
import {usePrettyNumber} from "../../../../hooks/usePrettyNumber";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../../../missing/error/ErrorPage";
import {RecentlyThing} from "../../../../models/RecentlyThing";
import CellSkeleton from "../../../../components/cell-skeleton-reborn/CellSkeleton";


function TodayPage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const {
        data: recentlyThings,
        isLoading: recentlyThingsLoading,
        isError: recentlyThingsError
    } = thingApi.useFetchRecentlyThingsQuery();

    const {
        data: randomThingOfDay,
        isLoading: randomThingOfDayLoading,
        isError: randomThingOfDayError
    } = thingApi.useFetchRandomThingOfDayQuery();

    if (randomThingOfDayLoading || recentlyThingsLoading) return <Loading/>
    if (randomThingOfDayError || recentlyThingsError) return <ErrorPage/>

    return <div className={classes.today_page}>
        {isMobile ?
            <TodayPageMobile randomThing={randomThingOfDay!} recentlyThings={recentlyThings!}/> :
            <TodayPageDesktop randomThing={randomThingOfDay!} recentlyThings={recentlyThings!}/>}
    </div>
}

function ThingCellMobile(props: {
    picLink: string,
    thingId: number,
    taskOrdinalNumber: number,
    randomThingDay?: boolean;
    username: string,
    prettyTime?: string,
    rand?: boolean
}) {
    const navigate = useNavigate();
    const {getPrettyNumber} = usePrettyNumber();

    return (
        <div className={classes.thing_cell_mobile} onClick={() => navigate(`/thing/${props.thingId}`)}>
            <SmallThingCell picUrl={props.picLink}/>
            <div className={classes.thing_cell_mobile_info}>
                <p>
                    {getPrettyNumber(props.thingId) + ' – ' + getPrettyNumber(props.taskOrdinalNumber)}
                    {props.rand && <span style={{
                        color: 'var(--link-hover)'
                    }}>{' (random thing of the day)'}</span>}
                </p>
                <div className={classes.thing_cell_mobile_info_bottom}>
                    <p>{`by @${props.username}`}</p>
                    <p>{props.prettyTime}</p>
                </div>
            </div>
        </div>
    )
}

function TodayPageDesktop(props: {
    randomThing: RecentlyThing,
    recentlyThings: RecentlyThing[]
}) {
    return <div className={classes.desktop}>
        <div className={classes.desktop_random_thing_of_day}>
            <p className={classes.desktop_random_thing_of_day_label}>{'/random thing of the day'}</p>
            <CellSkeleton thing={props.randomThing.thing} foreign={true}/>
        </div>
        <div className={classes.desktop_list_recently}>
            <p className={classes.desktop_list_recently_label}>{'/update'}</p>
            <RecentlyAddedThings recentlyThings={props.recentlyThings}/>
        </div>
    </div>
}

function TodayPageMobile(props: {
    randomThing: RecentlyThing,
    recentlyThings: RecentlyThing[]
}) {

    return <div className={classes.mobile}>
        <div className={classes.mobile_list_recently}>
            <div className={classes.mobile_list_recently_random_thing_of_day}>
                <ThingCellMobile
                    rand={true}
                    key={props.randomThing.thingId}
                    picLink={props.randomThing.pictureLink}
                    thingId={props.randomThing.thingId}
                    taskOrdinalNumber={props.randomThing.taskOrdinalNumber}
                    username={props.randomThing.username}
                    prettyTime={props.randomThing.prettyTime}
                />
            </div>
            {props.recentlyThings.map(t => <ThingCellMobile
                key={t.thingId}
                picLink={t.pictureLink}
                thingId={t.thingId}
                taskOrdinalNumber={t.taskOrdinalNumber}
                username={t.username}
                prettyTime={t.prettyTime}
            />)}
        </div>
    </div>
}

export default TodayPage;