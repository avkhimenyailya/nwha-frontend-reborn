import React, { useState } from 'react';
import classes from './CollectionPanel.module.css';
import CollectionCellComponent from '../../../../../components/collection-cell/collection-cell.component';
import { Collection } from '../../../../../models/Collection';

interface CollectionPanelProps {
    collections?: Collection[];
}

function CollectionPanel({ collections }: CollectionPanelProps) {
    const [collectionsList, setCollectionList] = useState([...Array(0)]);

    function addNewCollection() {
        setCollectionList(prevState => [...prevState, undefined]);
    }

    return (
        <div className={ classes.CollectionsPanel }>
            <div className={ classes.CollectionsPanelInterface }>
                <p onClick={ () => addNewCollection() } className={ classes.CreateNewCollectionBtn }>
                    [ create new collection ]
                </p>
            </div>
            <div className={ classes.CollectionCellList }>
                { collectionsList.map((x, i) =>
                    <CollectionCellComponent
                        key={ i }
                        name={ 'Collection ' + (i + 1) }
                    />).reverse()
                }
            </div>
        </div>
    );
}

export default CollectionPanel;