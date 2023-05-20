import {thingApi} from '../../../store/api/thingApi';
import {profileApi} from '../../../store/api/profileApi';
import {profileTaskApi} from '../../../store/api/profileTaskApi';
import {collectionThingsApi} from '../../../store/api/collectionThingsApi';
import {useParams} from 'react-router-dom';
import {taskApi} from '../../../store/api/taskApi';
import {useEffect, useState} from 'react';

export function useProfileHook() {
    const { username } = useParams();

    const {
        data: profile,
        isError: isProfileError,
        isLoading: isProfileLoading,
        isSuccess: isProfileSuccess
    } = profileApi.useFetchProfileByUsernameQuery(username!);

    const {
        data: profileTasks,
        isError: isProfileTasksError,
        isLoading: isProfileTasksLoading
    } = profileTaskApi.useFetchProfileTasksByProfileIdQuery(profile?.id!, { skip: !profile });

    const {
        data: collectionsThings,
        isError: isCollectionsThingsError,
        isLoading: isCollectionsThingsLoading
    } = collectionThingsApi.useFetchCollectionsThingsByProfileIdQuery(profile?.id!, { skip: !profile });

    const {
        data: archivedThings,
        isError: isArchivedThingsError,
        isLoading: isArchivedThingsLoading
    } = thingApi.useFetchArchivedThingsByPrincipalQuery();

    const [updProfileDescription] = profileApi.useUpdateProfileDescriptionMutation();
    const [updProfilePersonalLink] = profileApi.useUpdateProfilePersonalLinkMutation();

    const {
        data: allTasks,
        isError: isAllTasksError,
        isLoading: isAllTasksLoading
    } = taskApi.useFetchAllTasksQuery();

    const [descriptionFacadeValue, setDescriptionFacadeValue] = useState('');
    const [personalLinkFacadeValue, setPersonalLinkFacadeValue] = useState('');
    const [changeDescriptionModalVisible, setChangeDescriptionModalVisible] = useState(false);

    useEffect(() => {
        setDescriptionFacadeValue(profile?.description ?? '');
        setPersonalLinkFacadeValue(profile?.personalLink ?? '');
    }, [profile]);

    function updateDescriptionAndPersonalLink() {
        updProfileDescription(descriptionFacadeValue.trim());
        updProfilePersonalLink(personalLinkFacadeValue.trim());
        setChangeDescriptionModalVisible(false);

    }

    const isError =
        isProfileError ||
        isProfileTasksError ||
        isCollectionsThingsError ||
        isArchivedThingsError ||
        isAllTasksError;
    const isLoading =
        isProfileLoading ||
        isProfileTasksLoading ||
        isCollectionsThingsLoading ||
        isArchivedThingsLoading ||
        isAllTasksLoading;

    return {
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
    };
}