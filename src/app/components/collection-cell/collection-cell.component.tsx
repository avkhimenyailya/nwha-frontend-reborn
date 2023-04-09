import React, { useState } from 'react';
import classes from './collection-cell.module.css';
import SmallThingCellComponent from '../small-thing-cell/small-thing-cell.component';

interface CollectionCellComponentProps {
    name?: string
}

function CollectionCellComponent(props: CollectionCellComponentProps) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onMouseEnter={ () => setHover(true) }
            onMouseLeave={ () => setHover(false) }
            className={ classes.CollectionCell }>
            <div
                className={ classes.Label + (hover ? ' ' + classes.LabelHover : '') }>
                <p className={ classes.Title }>{ props.name ? props.name : 'Collection ?'}</p>
                <p className={ classes.ThingsAmount + (hover ? ' ' + classes.ThingsAmountHover : '') }>15 things</p>
            </div>
            <div className={ classes.ThingCellList }>
                { [...Array(4)].map((x, i) => <SmallThingCellComponent hover={ hover }/>) }
            </div>
        </div>
    );
}

export default CollectionCellComponent;