import React from 'react';
import classes from './collection-editor-modal.module.css';

interface NewCollectionModalComponentProps {

}

function CollectionEditorModalComponent(props: NewCollectionModalComponentProps) {

    return (
        <div className={ classes.CollectionEditorModal }>
            <p>This NewCollectionModalComponent component</p>
        </div>
    );
}

export default CollectionEditorModalComponent;