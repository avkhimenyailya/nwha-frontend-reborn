import React from 'react';
import classes from './CollectionThingsModal3.module.css';
import ModalSkeleton from '../modal-skeleton/ModalSkeleton';
import {useCollectionThingsModalHook} from './useCollectionThingsModalHook';
import Input from '../../primitives/fields/input/Input';
import Button from '../../primitives/buttons/button /Button';
import {usePrettyNumber} from '../../../hooks/usePrettyNumber';
import {Thing} from "../../../models/Thing";
import Img from "../../img/Img";
import {Profile} from "../../../models/Profile";

interface CollectionThingsModal3Props {
    thing: Thing;
    ownerProfile: Profile;
    setModalVisible: (flag: boolean) => void;
}

function CollectionThingsModal3(props: CollectionThingsModal3Props) {

    const {
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
    } = useCollectionThingsModalHook(props.ownerProfile, props.thing);

    const {getPrettyNumber} = usePrettyNumber();

    function renderThingInfo() {
        return <div className={classes.ThingInfo}>
            <Img className={classes.ThingPhoto} src={props.thing.pictureLink!}/>
            <div className={classes.ThingName}>
                <p>{getPrettyNumber(props.thing.id!)}</p>
                <p>{`by @${props.ownerProfile?.username}`}</p>
            </div>
        </div>
    }

    function renderCreateCollectionThingsContainer() {
        return <div className={classes.CreateCollectionThingsContainer}>
            <div className={classes.CollectionThingsNameInput}>
                <Input
                    placeholder={'min 6 chars'}
                    value={newCollectionThingName}
                    setValue={setNewCollectionThingName}
                />
            </div>
            <div className={classes.CreateCollectionThingsButton}>
                <Button
                    onClick={() => createNewCollectionThings()}
                    value={'create'}
                    disabled={disableCreateNewCollectionButton}
                />
            </div>
        </div>;
    }

    function renderCollectionsThingsList() {
        return <div className={classes.CollectionsThingsList}>
            {collectionsThings?.filter(ct => !Boolean(ct.things.find(t => t.id === props.thing.id)))
                .map(ct => <div
                    className={classes.CollectionThingsItem}>
                    <input
                        value={ct.id}
                        type={'checkbox'}
                        onChange={event => {
                            const newSet = new Set(checkedCollectionsThingsIds);
                            if (event.target.checked) {
                                newSet.add(event.target.value);
                            } else {
                                newSet.delete(event.target.value);
                            }
                            setCheckedCollectionsThingsIds(newSet);
                        }}
                    />
                    <p>{ct.name}</p>
                </div>).reverse()}
        </div>;
    }

    return (
        <ModalSkeleton
            buttons={[
                <Button
                    value={'add'}
                    borderSide={true}
                    disabled={disableAddThingInCollectionButton}
                    onClick={() => {
                        addThingInCheckedCollectionsThings();
                        props.setModalVisible(false);
                    }}
                />
            ]}
            setModalVisible={props.setModalVisible}>
            {renderThingInfo()}
            {renderCreateCollectionThingsContainer()}
            {renderCollectionsThingsList()}
        </ModalSkeleton>
    );
}

export default CollectionThingsModal3;