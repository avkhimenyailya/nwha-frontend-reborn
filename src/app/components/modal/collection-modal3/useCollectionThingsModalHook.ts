import { collectionThingsApi } from '../../../store/api/collectionThingsApi';
import { profileApi } from '../../../store/api/profileApi';
import { Thing } from '../../../models/Thing';
import { useEffect, useState } from 'react';

export function useCollectionThingsModalHook(thing: Thing) {

    const {
        data: ownerProfile,
        isError: ownerProfileIsError,
        isLoading: ownerProfileIsLoading
    } = profileApi.useFetchProfileByIdQuery(thing.profileId);

    const {
        data: collectionsThings,
        isError: collectionsThingsIsError,
        isLoading: collectionsThingsIsLoading
    } = collectionThingsApi.useFetchCollectionsThingsByPrincipalQuery();

    const [putThing] = collectionThingsApi.usePutThingInCollectionThingsMutation();
    const [createCollectionThings] = collectionThingsApi.useCreateCollectionThingsMutation();

    const [newCollectionThingName, setNewCollectionThingName] = useState('');
    const [disableCreateNewCollectionButton, setDisableCreateNewCollectionButton] = useState(true);
    const [disableAddThingInCollectionButton, setDisableAddThingInCollectionButton] = useState(true);

    const [checkedCollectionsThingsIds, setCheckedCollectionsThingsIds] = useState(new Set());

    const isError = collectionsThingsIsError || ownerProfileIsError;
    const isLoading = collectionsThingsIsLoading || ownerProfileIsLoading;

    useEffect(() => {
        setDisableCreateNewCollectionButton(!(newCollectionThingName.length >= 6));
    }, [newCollectionThingName]);

    useEffect(() => {
        setDisableAddThingInCollectionButton(!(checkedCollectionsThingsIds.size > 0));
    }, [checkedCollectionsThingsIds]);


    function createNewCollectionThings() {
        createCollectionThings(newCollectionThingName.trim())
            .unwrap()
            .then(_ => {
                setNewCollectionThingName('');
            });
    }

    function addThingInCheckedCollectionsThings() {
        Array.from(checkedCollectionsThingsIds.values()).forEach(id => {
            putThing({
                thingId: thing.id!,
                collectionId: Number(id)
            });
        });
    }

    return {
        isError,
        isLoading,

        ownerProfile,
        collectionsThings,

        putThing,
        createCollectionThings,

        newCollectionThingName,
        setNewCollectionThingName,

        createNewCollectionThings,
        addThingInCheckedCollectionsThings,

        disableCreateNewCollectionButton,
        disableAddThingInCollectionButton,

        checkedCollectionsThingsIds,
        setCheckedCollectionsThingsIds
    };
}