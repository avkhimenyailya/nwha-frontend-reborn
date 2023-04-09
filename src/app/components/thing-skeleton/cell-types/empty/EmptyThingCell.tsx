import React, { useState } from 'react';
import classes from './EmptyThingCell.module.css';
import { useAppSelector } from '../../../../store/store';
import Modal from '../../../modal/Modal';
import ThingCellModal from '../../../thing-cell-modal/ThingCellModal';
import { ProfileTask } from '../../../../models/ProfileTask';

interface EmptyThingCellProps {
    profileTask: ProfileTask;
}


function EmptyThingCell(props: EmptyThingCellProps) {
    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState(false);
    const theme = useAppSelector(state => state.theme);

    const emptyThingCellClasses = [classes.EmptyThingCell, hover && classes.EmptyThingCellHover];
    return (
        <>
            {
                showModal && <Modal
                    content={ <ThingCellModal profileTask={ props.profileTask }/> }
                    setShowModal={ setShowModal }
                />
            }
            <div
                onClick={ () => setShowModal(true) }
                onMouseEnter={ () => setHover(true) }
                onMouseLeave={ () => setHover(false) }
                className={ emptyThingCellClasses.join(' ') }>
                { hover && <img
                    alt={ '?' }
                    src={ require(
                        theme.theme === 'light'
                            ? '../../../../../static/icons/profile-task-plus-icon__light.svg'
                            : '../../../../../static/icons/profile-task-plus-icon__dark.svg').default }
                    draggable={ false }
                    style={ { userSelect: 'none' } }
                /> }
            </div>
        </>
    );
}

export default EmptyThingCell;