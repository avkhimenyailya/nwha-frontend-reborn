import React, { MouseEventHandler, useState } from 'react';
import classes from './CellSkeleton.module.css';
import Svg from '../primitives/svg/Svg';
import { Thing } from '../../models/Thing';
import { Link } from 'react-router-dom';

interface CellSkeletonProps {
    thing?: Thing;

    remark?: string;
    cellTitle?: string;
    description?: string;

    foreign?: boolean;
    contextMenu?: React.ReactNode;
    handleAddButton?: MouseEventHandler<HTMLInputElement>;
}

function CellSkeleton(props: CellSkeletonProps) {
    const [hover, setHover] = useState(false);

    function renderCell() {
        return (
            <div
                className={ classes.Content }
                onMouseEnter={ () => setHover(true) }
                onMouseLeave={ () => setHover(false) }>
                { renderContent() }
                { hover && renderContextMenu() }
            </div>
        );
    }

    function renderContent() {
        return props.thing?.fileUrl
            ? renderImg()
            : props.foreign
                ? renderObliqueLine()
                : renderAddButton();
    }

    function renderAddButton() {
        return hover && <div
            onClick={ props.handleAddButton }
            className={ classes.Clickable }>
            <Svg path={ require('./modal-button.light.svg').default }/>
        </div>;
    }

    function renderObliqueLine() {
        return <Svg path={ require('./oblique-line.light.svg').default }/>;
    }

    function renderImg() {
        return <Link to={ `/thing/${ props.thing?.id }` }>
            <div className={ classes.Clickable }>
                <img alt="?" src={ props.thing?.fileUrl }
                     className={ classes.Img }/>
            </div>
        </Link>;
    }


    function renderContextMenu() {
        return props.thing?.fileUrl && <p className={ classes.ContextMenu }>
            { props.contextMenu }
        </p>;
    }

    function renderCellTitle() {
        return <p className={ classes.CellTitle }>
            { props.cellTitle }
            <span className={ classes.Remark }>{ props.remark }</span>
        </p>;
    }

    function renderDescription() {
        return <p className={ classes.Description }>
            { props.description }
        </p>;
    }

    return (
        <div className={ classes.CellSkeleton }>
            { renderCell() }
            { props.cellTitle && renderCellTitle() }
            { props.description && renderDescription() }
        </div>
    );
}

export default CellSkeleton;