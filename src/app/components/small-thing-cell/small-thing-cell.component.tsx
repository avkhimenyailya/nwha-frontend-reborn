import React from 'react';
import classes from './small-thing-cell.module.css';
import {Thing} from '../../models/Thing';
import Img from "../img/Img";

interface SmallThingCellComponentProps {
    thing?: Thing;
    hover: boolean;
}

function SmallThingCellComponent(props: SmallThingCellComponentProps) {

    return (
        <div className={classes.SmallThingCell + (props.hover ? ' ' + classes.SmallThingCellHover : '')}>
            {
                props.thing &&
                <Img className={classes.Img} src={props.thing.pictureLink!}/>
            }
        </div>
    );
}

export default SmallThingCellComponent;