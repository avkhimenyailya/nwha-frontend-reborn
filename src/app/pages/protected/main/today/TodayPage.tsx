import React from 'react';
import classes from './TodayPage.module.css';
import CellSkeleton from '../../../../components/cell-skeleton-reborn/CellSkeleton';
import {thingApi} from '../../../../store/api/thingApi';
import RecentlyAddedThings from '../../../../components/recently-added-things/RecentlyAddedThings';
import Loading from "../../../../components/loading/Loading";
import Herbarium from "../../../../components/herbarium/Herbarium";


function TodayPage() {

    const {
        data: recentlyThings,
        isLoading: recentlyThingsLoading,
        isError: recentlyThingsError
    } = thingApi.useFetchRecentlyThingsQuery();

    if (recentlyThingsLoading) return <Loading/>
    if (recentlyThingsError) return <p>Errrrroooorrr</p>

    return (
        <div className={classes.HomePage}>
            <div className={classes.Cell}>
                <p className={classes.Label}>/random thing of the day</p>
                <CellSkeleton
                    foreign={true}
                    extraTitle={'#'}
                />
            </div>
            <div className={classes.ListRecent}>
                <p className={classes.Label}>/updates</p>
                <RecentlyAddedThings recentlyThings={recentlyThings!}/>
            </div>
        </div>
    );
}

export default TodayPage;