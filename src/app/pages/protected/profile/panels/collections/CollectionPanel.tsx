import React from 'react';
import classes from './CollectionPanel.module.css';
import CollectionCellComponent from '../../../../../components/collection-cell/collection-cell.component';
import { collectionThingsApi } from '../../../../../store/api/collectionThingsApi';
import { useAppSelector } from '../../../../../store/store';
import { CollectionThings } from '../../../../../models/CollectionThings';

interface CollectionPanelProps {
    foreign: boolean;
    collectionsThings: CollectionThings[];
}

function CollectionPanel(props: CollectionPanelProps) {
    const currentProfileId = useAppSelector(state => state.authSlice.data?.profileId);

    const [create, {
        isSuccess: createCtSuccess
    }] = collectionThingsApi.useCreateCollectionThingsMutation();

    function addNewCollection() {
        create('New collection');
    }

    return (
        <div className={ classes.CollectionsPanel }>
            { props.collectionsThings && <div className={ classes.CollectionsPanelInterface }>
                { !props.foreign &&
                    <p onClick={ () => addNewCollection() } className={ classes.CreateNewCollectionBtn }>
                        [ create new collection ]
                    </p> }
            </div> }
            {
                props.collectionsThings && !props.collectionsThings.length &&
                <p className={ classes.EmptyList }>no collections yet</p>
            }
            {
                props.collectionsThings &&
                <div className={ classes.CollectionCellList }>
                    { props.collectionsThings.map(ct =>
                        <CollectionCellComponent
                            key={ ct.id }
                            collectionThings={ ct }
                        />).reverse()
                    }
                </div>
            }
        </div>
    );
}

export default CollectionPanel;