import React from "react";
import classes from './SmallThingCell.module.scss'
import Img from "../img/Img";

interface SmallThingCellProps {
    picUrl: string;
}

function SmallThingCell(props: SmallThingCellProps) {
    return (
        <div className={classes.SmartThingCell}>
            <Img className={classes.Img} src={props.picUrl}/>
        </div>
    );
}

export default SmallThingCell;