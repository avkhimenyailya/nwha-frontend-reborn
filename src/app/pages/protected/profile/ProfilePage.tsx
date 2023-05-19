import React, { useEffect } from 'react';
import classes from './ProfilePage.module.css';
import { useProfileHook } from './useProfileHook';
import Loading from '../../../components/loading/Loading';
import ProfileTopContainer from '../../../components/profile/top-container/ProfileTopContainer';
import ErrorPage from '../../missing/error/ErrorPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CollectionPanel from './panels/collections/CollectionPanel';
import ThingsPanel from './panels/things/ThingsPanel';
import ArchivePanel from './panels/archive/ArchivePanel';
import ChangeDescriptionModal from '../../../components/modal/change-description/ChangeDescriptionModal';
import { useAppSelector } from '../../../store/store';

function ProfilePage() {
    const {
        isError,
        isLoading,
        isProfileSuccess,

        profile,
        profileTasks,
        collectionsThings,
        archivedThings,
        allTasks,

        descriptionFacadeValue,
        personalLinkFacadeValue,
        setDescriptionFacadeValue,
        setPersonalLinkFacadeValue,
        changeDescriptionModalVisible,
        setChangeDescriptionModalVisible,

        updateDescriptionAndPersonalLink
    } = useProfileHook();

    const principalProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (isProfileSuccess && location.pathname === `/${ profile!.username }`) {
            navigate(`things`);
        }
    }, [isProfileSuccess, location.pathname, navigate, profile]);

    if (isLoading && !isError) return <Loading/>;
    if (isError) return <ErrorPage/>;

    return (
        <div className={ classes.ProfilePage }>
            { changeDescriptionModalVisible &&
                <ChangeDescriptionModal
                    profile={ profile! }
                    setModalVisible={ setChangeDescriptionModalVisible }
                /> }
            <ProfileTopContainer
                profile={ profile! }
                onClickEditDescriptionButton={ () => setChangeDescriptionModalVisible(true) }
            />
            <Routes>
                <Route
                    path={ 'things' }
                    element={ <ThingsPanel profileTasks={ profileTasks! }/> }
                />
                <Route
                    path={ 'collections' }
                    element={ <CollectionPanel foreign={ !(principalProfileId === profile?.id) }
                                               collectionsThings={ collectionsThings! }/> }
                />
                <Route
                    path={ 'archive' }
                    element={ <ArchivePanel archivedThings={ archivedThings! } allTasks={ allTasks! }/> }
                />
            </Routes>
        </div>
    );
}

export default ProfilePage;