import React from 'react';
import classes from './TodayPage.module.css';
import CellSkeleton from '../../../../components/cell-skeleton-reborn/CellSkeleton';
import { useAppSelector } from '../../../../store/store';
import { profileApi } from '../../../../store/api/profileApi';
import { thingApi } from '../../../../store/api/thingApi';
import RecentlyAddedThings from '../../../../components/recently-added-things/RecentlyAddedThings';


function TodayPage() {
    const authData = useAppSelector(state => state.authSlice.data);

    const {
        data: profile,
        isSuccess: profileSuccess
    } = profileApi.useFetchProfileByIdQuery(authData?.profileId!);

    const {
        data: recentlyAddedThings,
        isSuccess: recentlyAddedThingsSuccess
    } = thingApi.useFetchRecentlyAddedThingsQuery();

    return (
        <div className={ classes.HomePage }>
            {
                profileSuccess &&
                <div className={ classes.Cell }>
                    <p className={ classes.Label }>/random thing of the day</p>
                    <CellSkeleton
                        thing={ profile.profileTasks?.find(p => p.thing)?.thing }
                        cellTitle={'27 – 02'}
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