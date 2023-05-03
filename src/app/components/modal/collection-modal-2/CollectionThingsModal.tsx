import React, { useEffect, useRef, useState } from 'react';
import classes from './CollectionThingsModal.module.css';
import { useAppSelector } from '../../../store/store';
import { profileApi } from '../../../store/api/profileApi';
import { collectionThingsApi } from '../../../store/api/collectionThingsApi';
import Button from '../../primitives/buttons/button /Button';
import Input from '../../primitives/fields/field/Input';
import { CollectionThings } from '../../../models/CollectionThings';
import Img from '../../primitives/img/Img';
import { ProfileTask } from '../../../models/ProfileTask';
import CollectionThingsItem from './CollectionThingsItem';

export interface CollectionThingsWrap {
    collectionThings: CollectionThings;
    checked: boolean;
}

interface CollectionThingsModalProps {
    profileTask: ProfileTask;
    modalVisible: (flag: boolean) => void;
}

function CollectionThingsModal(props: CollectionThingsModalProps) {
    // >>>-------------------------------- states  --------------------------------<<<
    const authorizedProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const [nameFieldValue, setNameFieldValue] = useState('');
    const [nameFieldVisible, setNameFieldVisible] = useState(false);
    const [collectionsThingsList, setCollectionsThingsList] = useState<CollectionThingsWrap[]>([]);
    const nameFieldRef = useRef<HTMLInputElement>(null);

    // >>>-------------------------------- queries --------------------------------<<<
    const {
        data: collectionsThings,
        isSuccess: collectionsThingsSuccess
    } = profileApi.useFetchCollectionsThingsByProfileIdQuery(authorizedProfileId, { skip: !authorizedProfileId });

    const [createCollectionThings, {
        isSuccess: createCollectionThingsSuccess
    }] = collectionThingsApi.useCreateCollectionThingsMutation();

    const [putThing, {
        isSuccess: putThingSuccess
    }] = collectionThingsApi.usePutThingInCollectionThingsMutation();

    const {
        data: ownerThing,
        isSuccess: ownerThingSuccess
    } = profileApi.useFetchProfileByIdQuery(props.profileTask.profileId);

    // >>>-------------------------------- effects --------------------------------<<<
    useEffect(() => {
        function handleKeydown(ev: KeyboardEvent) {
            if (ev.key === 'Enter') {
                if (nameFieldValue) {
                    const wrap = {
                        collectionThings: {
                            things: [],
                            name: nameFieldValue,
                            profileId: authorizedProfileId!
                        },
                        checked: true
                    } as CollectionThingsWrap;

                    const newList = [...collectionsThingsList!, wrap];
                    setCollectionsThingsList(newList);
                    setNameFieldValue('');
                    setNameFieldVisible(false);
                }
            }
        }

        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [authorizedProfileId, collectionsThingsList, nameFieldValue, nameFieldValue.length]);

    useEffect(() => {
        console.log('eefff');
        setCollectionsThingsList(collectionsThings?.map(ct => {
            return {
                collectionThings: ct,
                checked: false
            } as CollectionThingsWrap;
        }) ?? []);
    }, [collectionsThings]);

    useEffect(() => {
        if (nameFieldVisible) nameFieldRef.current?.focus();
    }, [nameFieldVisible]);


    function renderFileInfo() {
        return <div className={ classes.File }>
            {
                ownerThingSuccess &&
                <>
                    <div className={ classes.FileImg }>
                        <Img imgUrl={ props.profileTask.thing?.fileUrl! }/>
                    </div>
                    <div className={ classes.FileName }>
                        <p>{ props.profileTask.thing?.id }</p>
                        <p>{ `by @${ ownerThing.username }` }</p>
                    </div>
                </>
            }
        </div>;
    }

    function renderAddNewCollectionButton() {
        return collectionsThingsSuccess &&
            <div className={ classes.AddNewCollectionButton }>
                <p onClick={ event => {
                    event.preventDefault();
                    setNameFieldVisible(prevState => !prevState);
                } }>{ `[create new collection]` }</p>
            </div>;
    }

    function renderNameField() {
        return nameFieldVisible &&
            <div style={ { marginBottom: '8px' } }>
                <Input
                    onBlur={ () => {
                        setNameFieldValue('');
                        setNameFieldVisible(false);
                    } }
                    onFocus={ () => console.log('О, а теперь в фокусе') }
                    ref={ nameFieldRef }
                    value={ nameFieldValue }
                    placeholder={ 'min 6 chars' }
                    onChange={ setNameFieldValue }
                />
            </div>;
    }

    function renderCollectionsThingsList() {
        return collectionsThingsSuccess &&
            <div className={ classes.CollectionsThingsList }>
                { collectionsThingsList?.map(ct => renderCollectionThingsItem(ct)).reverse() }
            </div>;
    }

    function renderCollectionThingsItem(collectionThingsWrap: CollectionThingsWrap) {
        return <CollectionThingsItem collectionThingsWrap={ collectionThingsWrap }/>;
    }

    return (
        <div className={ classes.CollectionThingsModal }>
            <div className={ classes.ModalWrap }>
                { renderFileInfo() }
                { renderAddNewCollectionButton() }
                { renderNameField() }
                { renderCollectionsThingsList() }
            </div>
            <div className={ classes.AddButton }>
                <Button onClick={ () => props.modalVisible(false) }/>
            </div>
        </div>
    );
}

export default CollectionThingsModal;