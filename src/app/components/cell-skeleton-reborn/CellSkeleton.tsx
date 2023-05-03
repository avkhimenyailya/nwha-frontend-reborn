import React, { MouseEventHandler, useState } from 'react';
import classes from './CellSkeleton.module.css';
import Svg from '../primitives/svg/Svg';
import Img from '../primitives/img/Img';
import { Thing } from '../../models/Thing';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { usePrettyNumber } from '../../hooks/usePrettyNumber';

interface CellSkeletonProps {
    thing?: Thing;

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
    const { getPrettyNumber } = usePrettyNumber();

    function renderCell() {
        const cellClasses = [classes.Content, (hover && (props.thing || !props.foreign)) && classes.ContentHover];
        return (
            <div
                className={ cellClasses.join(' ') }
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
        return <Link to={ `/thing/${ props.thing?.id }` }>
            <div className={ classes.Clickable }>
                <Img imgUrl={ props.thing?.fileUrl ?? '' }/>
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
            { props.extraTitle
                ? (<span
                    style={ { color: props.lock ? 'var(--sub-color2)' : 'var(--main-color)' } }>{ props.extraTitle }</span>)
                : (
                    <span>{ `${ getPrettyNumber(props.thing?.id!) } - ${ getPrettyNumber(props.thing?.taskOrdinalNumber!) }` }</span>
                ) }
            <span className={ classes.Remark }>{ props.remark }</span>
        </p>;
    }

    function renderDescription() {
        return <p className={ classes.Description }>
            { props.description?.replaceAll('%%%', '\n') }
        </p>;
    }

    return (
        <div className={ classes.CellSkeleton }>
            { renderCell() }
            { renderCellTitle() }
            { props.description && renderDescription() }
        </div>
    );
}

export default CellSkeleton;