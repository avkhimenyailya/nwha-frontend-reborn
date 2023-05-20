import React, {MouseEventHandler, useState} from 'react';
import classes from './CellSkeleton.module.css';
import Svg from '../primitives/svg/Svg';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../store/store';
import {usePrettyNumber} from '../../hooks/usePrettyNumber';
import {Thing} from "../../models/Thing";
import Img from "../img/Img";
import {Task} from "../../models/Task";

interface CellSkeletonProps {
    thing?: Thing;
    task?: Task;

    remark?: string;
    description?: string;
    extraTitle?: string;

    lock?: boolean;
    foreign?: boolean;
    contextMenu?: React.ReactNode;
    handleAddButton?: MouseEventHandler<HTMLInputElement>;
}

function CellSkeleton(props: CellSkeletonProps) {
    const theme = useAppSelector(state => state.themeSlice.theme);
    const [hover, setHover] = useState(false);
    const {getPrettyNumber} = usePrettyNumber();

    function renderCell() {
        const cellClasses = [classes.Content, (hover && (props.thing || !props.foreign)) && classes.ContentHover];
        return (
            <div
                className={cellClasses.join(' ')}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {renderContent()}
                {hover && renderContextMenu()}
            </div>
        );
    }

    function renderContent() {
        return props.thing?.pictureLink
            ? renderImg()
            : props.foreign
                ? renderObliqueLine()
                : renderAddButton();
    }

    function renderAddButton() {
        return hover && <div
            onClick={props.handleAddButton}
            className={classes.Clickable}>
            <Svg path={
                theme === 'dark'
                    ? require(`./modal-button.dark.svg`).default
                    : require(`./modal-button.light.svg`).default
            }/>
        </div>;
    }

    function renderObliqueLine() {
        return <Svg path={
            theme === 'dark'
                ? require(`./oblique-line.dark.svg`).default
                : require(`./oblique-line.light.svg`).default
        }/>;
    }

    function renderImg() {
        return <Link to={`/thing/${props.thing?.id}`}>
            <Img src={props.thing?.pictureLink!}/>
        </Link>;
    }


    function renderContextMenu() {
        return props.thing?.pictureLink && <div className={classes.ContextMenu}>
            {props.contextMenu}
        </div>;
    }

    function renderCellTitle() {
        return <p className={classes.CellTitle}>
            {props.extraTitle
                ?
                <span style={{color: props.lock ? 'var(--sub-color2)' : 'var(--main-color)'}}>{props.extraTitle}</span>
                : renderPrettyThingTitle()
            }
            {props.remark && <span className={classes.Remark}>{props.remark}</span>}
        </p>;
    }

    function renderPrettyThingTitle() {
        return <span>{`${getPrettyNumber(props.thing?.id!)} – ${getPrettyNumber(props.thing?.taskId! - 1)}`}</span>
    }

    function renderDescription() {
        return <p className={classes.Description}>
            {props.description?.replaceAll('%%%', '\n')}
        </p>;
    }

    return (
        <div className={classes.CellSkeleton}>
            {renderCell()}
            {renderCellTitle()}
            {props.description && renderDescription()}
        </div>
    );
}

export default CellSkeleton;