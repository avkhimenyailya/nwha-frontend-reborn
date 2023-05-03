import React, { useEffect, useState } from 'react';
import { CollectionThingsWrap } from './CollectionThingsModal';
import classes from './CollectionThingsModal.module.css';

interface CollectionThingsItemProps {
    collectionThingsWrap: CollectionThingsWrap;
}

function CollectionThingsItem(props: CollectionThingsItemProps) {
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        setChecked(props.collectionThingsWrap.checked);
    }, [props.collectionThingsWrap.checked]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        props.collectionThingsWrap.checked = isChecked;
    };

    return (
        <div key={ props.collectionThingsWrap.collectionThings.id } className={ classes.CollectionThingsItem }>
            <input
                type={ 'checkbox' }
                value={ props.collectionThingsWrap.collectionThings.id }
                onChange={ handleCheckboxChange }
                checked={ checked }
            />
            <p>{ props.collectionThingsWrap.collectionThings.name }</p>
        </div>
    );
}

export default CollectionThingsItem;