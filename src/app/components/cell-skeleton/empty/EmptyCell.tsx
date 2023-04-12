import React, { useState } from 'react';
import classes from './EmptyCell.module.css';
import { ProfileTask } from '../../../models/ProfileTask';

interface EmptyCellProps {
    profileTask: ProfileTask;
    isPerson: boolean;
    setModalVisible: (flag: boolean) => void;
}


function EmptyCell(props: EmptyCellProps) {
    const [hover, setHover] = useState(false);

    function renderIcon() {
        return hover && <img
            alt={ '?' }
            src={ require('../../../../static/icons/profile-task-plus-icon__light.svg').default }
            draggable={ false }
            style={ { userSelect: 'none' } }/>;
    }

    function renderObliqueLine() {
        return <svg height={ '177' } width={ '177' }>
            <line
                xmlns={ 'http://www.w3.org/2000/svg' }
                stroke={ '#AAAAB0' }
                y2={ '0' }
                x2={ '0' }
                y1={ '177' }
                x1={ '177' }
            />
        </svg>;
    }

    const emptyCellClasses = [
        classes.EmptyCell,
        (hover && props.isPerson) && classes.EmptyCellHover
    ];

    return (
        <div
            onClick={ () => props.setModalVisible(true) }
            className={ emptyCellClasses.join(' ') }
            onMouseEnter={ () => setHover(true) }
            onMouseLeave={ () => setHover(false) }
            style={ { cursor: props.isPerson ? 'pointer' : 'initial' } }>
            { props.isPerson ? renderIcon() : renderObliqueLine() }
        </div>
    );
}

export default EmptyCell;