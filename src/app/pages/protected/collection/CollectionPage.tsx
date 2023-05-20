import React, { useEffect, useRef, useState } from 'react';
import classes from './CollectionPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import CellList from '../../../components/cell-list/CellList';
import CellSkeleton from '../../../components/cell-skeleton-reborn/CellSkeleton';
import { profileApi } from '../../../store/api/profileApi';
import { useAppSelector } from '../../../store/store';
import Input from '../../../components/primitives/fields/input/Input';
import { collectionThingsApi } from '../../../store/api/collectionThingsApi';

interface CollectionPageProps {

}

function CollectionPage(props: CollectionPageProps) {
    const { id } = useParams();
    const profileId = useAppSelector(state => state.authSlice.data?.profileId);

    const [collectionName, setCollectionName] = useState('');
    const [disableChangeName, setDisableChangeName] = useState(true);

    const inputNameRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const [trigger, {
        data: collectionThingsById,
        isSuccess: collectionThingsByIdSuccess
    }] = collectionThingsApi.useLazyFetchCollectionThingsByIdQuery();


    const {
        data: ownerProfile,
        isSuccess: ownerProfileSuccess
    } = profileApi.useFetchProfileByIdQuery(collectionThingsById?.profileId, { skip: !collectionThingsById });

    const [deleteCollectionThingsById] = collectionThingsApi.useDeleteCollectionThingsByIdMutation();
    const [updateNameCollectionThingsById] = collectionThingsApi.useUpdateCollectionThingNameByIdMutation();

    useEffect(() => {
        trigger(Number(id));
    }, [id, trigger]);

    useEffect(() => {
        if (collectionThingsByIdSuccess) setCollectionName(collectionThingsById!.name);
    }, [collectionThingsById, collectionThingsByIdSuccess]);

    useEffect(() => {
        if (!disableChangeName) {
            inputNameRef.current?.focus();
        }
    }, [disableChangeName]);

    function changeName() {
        setDisableChangeName(prevState => !prevState);
    }

    function updateName(collectionId: number) {
        if (collectionName.length > 5) {
            updateNameCollectionThingsById({
                collectionId,
                name: collectionName
            });
            setDisableChangeName(true);
        } else {
            alert('min 6 chars');
        }
    }

    return (
        <div className={ classes.CollectionPage }>
            { (collectionThingsByIdSuccess && ownerProfileSuccess) && <div className={ classes.Interface }>
                <div className={ classes.Name }>
                    <p>{ `@${ ownerProfile.username } /` }</p>
                    <div style={ {} }>
                        <Input
                            ref={ inputNameRef }
                            placeholder={ 'min 6 chars' }
                            disabled={ disableChangeName }
                            disableStyle={ true }
                            value={ collectionName }
                            setValue={ setCollectionName }
                            onKeyDown={ event => {
                                if (event.key === 'Enter') {
                                    updateName(collectionThingsById!.id!);
                                }
                            } }
                            onBlur={ _ => updateName(collectionThingsById!.id!) }
                        />
                    </div>
                </div>
                { (ownerProfile.id === profileId) &&
                    <p className={ classes.ChangeNameButton } onClick={ changeName }>
                        { '[change name]' }
                    </p> }
                <p className={ classes.CountThings }>
                    { `${ collectionThingsById!.things.length } things` }
                </p>
                { (ownerProfile.id === profileId) && <p
                    className={ classes.DeleteCollectionButton }
                    onClick={ _ => {
                        const confirm: boolean = window.confirm('Вы уверены, что хотите удалить коллекцию?');
                        if (confirm) {
                            deleteCollectionThingsById(collectionThingsById!.id!);
                            navigate(`/${ ownerProfile.username }/collections`);
                        }
                    } }
                >
                    { '[delete collection]' }
                </p>
                }
            </div>
            }

            { (collectionThingsByIdSuccess && ownerProfileSuccess) && <div className={ classes.ThingList }>
                <CellList>
                    { collectionThingsById?.things?.map(t =>
                        <CellSkeleton thing={ t } />) }
                </CellList>
            </div> }
        </div>
    )
        ;
}

export default CollectionPage;