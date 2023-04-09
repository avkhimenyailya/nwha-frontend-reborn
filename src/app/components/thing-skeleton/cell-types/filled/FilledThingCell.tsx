import React, { useState } from 'react';
import classes from './FilledThingCell.module.css';
import ContextMenu from '../../../contex-menu/ContextMenu';
import SmallButton from '../../../primitives/buttons/small-button/SmallButton';
import Modal from '../../../modal/Modal';
import ThingCellModal from '../../../thing-cell-modal/ThingCellModal';
import { ProfileTask } from '../../../../models/ProfileTask';

interface FilledThingCellProps {
    profileTask: ProfileTask;
}

function FilledThingCell({ profileTask }: FilledThingCellProps) {
    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState(false);
    const filledThingCellClasses = [classes.FilledThingCell, hover && classes.FilledThingCellHover];

    return (
        <>
            { showModal &&
                <Modal
                    content={ <ThingCellModal profileTask={ profileTask }/> }
                    setShowModal={ setShowModal }/>
            }
            <div
                onMouseEnter={ () => setHover(true) }
                onMouseLeave={ () => setHover(false) }
                className={ filledThingCellClasses.join(' ') }>
                <img
                    alt={ 'img' }
                    draggable={ false }
                    style={ { objectFit: 'contain' } }
                    src={ profileTask.thing?.fileUrl }
                />
                { hover && <div className={ classes.FilledThingCellMenu }>
                    <ContextMenu buttons={ [
                        <SmallButton value={ 'edit' } onClick={ () =>
                            setShowModal(true) }/>
                    ] }/>
                </div> }
            </div>
        </>
    );
}

export default FilledThingCell;