import React, { useState } from 'react';
import classes from './collection-cell.module.css';
import SmallThingCellComponent from '../small-thing-cell/small-thing-cell.component';
import { Link } from 'react-router-dom';
import { CollectionThings } from '../../models/CollectionThings';

interface CollectionCellComponentProps {
    collectionThings: CollectionThings;
}

function CollectionCellComponent(props: CollectionCellComponentProps) {
    const [hover, setHover] = useState(false);

    function renderCommonCell(amount: number) {
        const commonCellClasses = [classes.CommonSmallCell, hover && classes.CommonSmallCellHover];
        return <Link to={ `/collection/${ props.collectionThings.id }` }>
            <div className={ commonCellClasses.join(' ') }>
                <p className={ classes.Amount }>&#43;{ amount }</p>
            </div>
        </Link>;
    }

    function renderThingCellList() {


        return <div className={ classes.ThingCellList }>
            {
                [...Array(4)].map((x, i) => {
                    if (i === 3 && props.collectionThings.things.length > 4) {
                        return renderCommonCell(props.collectionThings.things.length - 3);
                    } else {
                        return <SmallThingCellComponent
                            thing={ props.collectionThings.things[i] }
                            hover={ hover }
                        />;
                    }
                })
            }
        </div>;
    }

    function getAmountThingsString(amount: number) {
        const postfix: string = amount === 1 ? ' thing' : ' things';
        return amount + postfix;
    }

    return (
        <div
            onMouseEnter={ () => setHover(true) }
            onMouseLeave={ () => setHover(false) }
            className={ classes.CollectionCell }>
            <Link to={ `/collection/${ props.collectionThings.id }` }>
                <div
                    className={ classes.Label + (hover ? ' ' + classes.LabelHover : '') }>
                    <p className={ classes.Title }>{ props.collectionThings.name }</p>
                    <p className={ classes.ThingsAmount + (hover ? ' ' + classes.ThingsAmountHover : '') }>{
                        getAmountThingsString(props.collectionThings.things.length)
                    }</p>
                </div>
            </Link>
            { renderThingCellList() }
        </div>
    );
}

export default CollectionCellComponent;