import {collectionThingsApi} from '../../../store/api/collectionThingsApi';
import {profileApi} from '../../../store/api/profileApi';
import {Thing} from '../../../models/Thing';
import {useEffect, useState} from 'react';
import {Profile} from "../../../models/Profile";

export function useCollectionThingsModalHook(ownerProfile: Profile, thing: Thing) {

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

    const isError = collectionsThingsIsError;
    const isLoading = collectionsThingsIsLoading;

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