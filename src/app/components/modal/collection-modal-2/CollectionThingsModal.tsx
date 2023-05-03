import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './CollectionThingsModal.module.css';
import { useAppSelector } from '../../../store/store';
import { profileApi } from '../../../store/api/profileApi';
import { collectionThingsApi } from '../../../store/api/collectionThingsApi';
import Button from '../../primitives/buttons/button /Button';
import Input from '../../primitives/fields/field/Input';
import { CollectionThings } from '../../../models/CollectionThings';
import Img from '../../primitives/img/Img';
import { ProfileTask } from '../../../models/ProfileTask';

export interface CollectionThingsWrap {
    collectionThings: CollectionThings;
    checked: boolean;
}

interface CollectionThingsModalProps {
    profileTask: ProfileTask;
    modalVisible: (flag: boolean) => void;
}

type CollectionThingItemProps = {
    id: number;
    checked: boolean;
    onChange: (status: boolean, id: number) => void;
    name: string;
};

export const CollectionThingItem: FC<CollectionThingItemProps> = ({ name, id, checked, onChange }) => (
    <div className={ classes.CollectionThingsItem }>
        <input
            value={ id }
            type={ 'checkbox' }
            checked={ checked }
            onChange={ event => onChange(event.target.checked, id) }
        />
        <p>{ name }</p>
    </div>
);


function CollectionThingsModal(props: CollectionThingsModalProps) {
    const authorizedProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const [nameFieldValue, setNameFieldValue] = useState('');
    const [nameFieldVisible, setNameFieldVisible] = useState(false);
    const [collectionsThingsList, setCollectionsThingsList] = useState<CollectionThingsWrap[]>([]);
    const nameFieldRef = useRef<HTMLInputElement>(null);

    const {
        data: collectionsThings,
        isSuccess: collectionsThingsSuccess
    } = profileApi.useFetchCollectionsThingsByProfileIdQuery(authorizedProfileId, { skip: !authorizedProfileId });

    const [putThing] = collectionThingsApi.usePutThingInCollectionThingsMutation();
    const [createCollectionThings] = collectionThingsApi.useCreateCollectionThingsMutation();

    const {
        data: ownerThing,
        isSuccess: ownerThingSuccess
    } = profileApi.useFetchProfileByIdQuery(props.profileTask.profileId);

    useEffect(() => {
        const newListWraps = collectionsThings?.filter(ct => !collectionsThingsList.find(c => c.collectionThings.id === ct.id)).map(ct => {
            return {
                collectionThings: ct,
                checked: false
            } as CollectionThingsWrap;
        });
        setCollectionsThingsList([...collectionsThingsList, ...newListWraps ?? []]);
    }, [collectionsThings, collectionsThingsList]);

    useEffect(() => {
        if (nameFieldVisible) nameFieldRef.current?.focus();
    }, [nameFieldVisible]);


    function renderFileInfo() {
        return <div className={ classes.File }>
            { ownerThingSuccess &&
                <>
                    <div className={ classes.FileImg }>
                        <Img imgUrl={ props.profileTask.thing?.fileUrl! }/>
                    </div>
                    <div className={ classes.FileName }>
                        <p>{ props.profileTask.thing?.id }</p>
                        <p>{ `by @${ ownerThing.username }` }</p>
                    </div>
                </> }
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

    function createNewCollection() {
        if (nameFieldValue.length > 5) {
            createCollectionThings(nameFieldValue)
                .unwrap()
                .then(r => {
                    const wrap = {
                        collectionThings: r,
                        checked: true
                    } as CollectionThingsWrap;
                    const newList = [...collectionsThingsList!, wrap];
                    setCollectionsThingsList(newList);
                    setNameFieldValue('');
                    setNameFieldVisible(false);
                });
        } else {
            alert('min 6 chars');
        }
    }

    function renderNameField() {
        return nameFieldVisible &&
            <div style={ { marginBottom: '8px' } }>
                <Input
                    onKeyDown={ event => {
                        if (event.key === 'Enter') {
                            createNewCollection();
                        }
                    } }
                    onBlur={ () => {
                        setNameFieldValue('');
                        setNameFieldVisible(false);
                    } }
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
                { collectionsThingsList?.map(ct => {
                    return renderCollectionThingsItem(ct);
                }).reverse() }
            </div>;
    }

    const handleChangeThingItem = (status: boolean, id: number) => {
        const updatedCollectionList = collectionsThingsList.map((collection) => {
            if (collection.collectionThings.id === id) {
                return { ...collection, checked: status };
            }
            return collection;
        });
        setCollectionsThingsList(updatedCollectionList);
    };

    function renderCollectionThingsItem(collectionThingsWrap: CollectionThingsWrap) {
        return <CollectionThingItem
            onChange={ handleChangeThingItem }
            checked={ collectionThingsWrap.checked }
            id={ collectionThingsWrap.collectionThings.id! }
            name={ collectionThingsWrap.collectionThings.name! }
        />;
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
                <Button
                    value={ 'add' }
                    onClick={ () => {
                        collectionsThingsList
                            .filter(ct => ct.checked)
                            .forEach(ct => {
                                putThing({
                                    collectionId: ct.collectionThings.id!,
                                    thingId: props.profileTask.thing?.id!
                                });
                            });
                        props.modalVisible(false);
                    } }
                />
            </div>
        </div>
    );
}

export default CollectionThingsModal;