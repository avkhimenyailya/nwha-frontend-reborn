import React from 'react';
import classes from './TodayPage.module.css';
import CellSkeleton from '../../../../components/cell-skeleton-reborn/CellSkeleton';
import { thingApi } from '../../../../store/api/thingApi';
import RecentlyAddedThings from '../../../../components/recently-added-things/RecentlyAddedThings';
import { profileTaskApi } from '../../../../store/api/profileTaskApi';


function TodayPage() {
    const {
        data: profileTasks,
        isSuccess: profileTasksSuccess
    } = profileTaskApi.useFetchProfileTasksByPrincipalQuery();

    const {
        data: recentlyAddedThings,
        isSuccess: recentlyAddedThingsSuccess
    } = thingApi.useFetchRecentlyAddedThingsQuery();

    return (
        <div className={ classes.HomePage }>
            {
                profileTasksSuccess &&
                <div className={ classes.Cell }>
                    <p className={ classes.Label }>/random thing of the day</p>
                    <CellSkeleton
                        foreign={ true }
                        extraTitle={ '#' }
                    />
                </div>
            }
            {
                recentlyAddedThingsSuccess &&
                <div className={ classes.ListRecent }>
                    <p className={ classes.Label }>/updates</p>
                    <RecentlyAddedThings recentlyAddedThings={ recentlyAddedThings }/>
                </div>
            }
        </div>
    );
}

export default TodayPage;