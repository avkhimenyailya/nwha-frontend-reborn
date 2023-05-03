import React from 'react';
import classes from './small-thing-cell.module.css';
import { Thing } from '../../models/Thing';

interface SmallThingCellComponentProps {
    thing?: Thing;
    hover: boolean;
}

function SmallThingCellComponent(props: SmallThingCellComponentProps) {

    return (
        <div className={ classes.SmallThingCell + (props.hover ? ' ' + classes.SmallThingCellHover : '') }>
            {
                props.thing &&
                <img
                    alt={ '?' }
                    draggable={ false }
                    style={ { objectFit: 'contain' } }
                    src={ props.thing.fileUrl! }
                />
            }
        </div>
    );
}

export default SmallThingCellComponent;