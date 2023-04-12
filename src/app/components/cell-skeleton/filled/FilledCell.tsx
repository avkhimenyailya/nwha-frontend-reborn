import React, { useState } from 'react';
import classes from './FilledCell.module.css';
import ContextMenu from '../../contex-menu/ContextMenu';
import SmallButton from '../../primitives/buttons/small-button/SmallButton';
import { ProfileTask } from '../../../models/ProfileTask';

interface FilledThingCellProps {
    isPerson: boolean;
    profileTask: ProfileTask;
    setModalVisible: (flag: boolean) => void;
}

function FilledCell(props: FilledThingCellProps) {
    const [hover, setHover] = useState(false);
    const filledThingCellClasses = [classes.FilledThingCell, hover && classes.FilledThingCellHover];

    return (
        <>
            <div
                onMouseEnter={ () => setHover(true) }
                onMouseLeave={ () => setHover(false) }
                className={ filledThingCellClasses.join(' ') }>
                <img
                    alt={ 'img' }
                    draggable={ false }
                    style={ { objectFit: 'contain' } }
                    src={ props.profileTask.thing?.fileUrl }
                />
                { hover && <div className={ classes.FilledThingCellMenu }>
                    <ContextMenu>
                        { [<SmallButton key={ 0 } value={ 'edit' } onClick={ () => props.setModalVisible(true) }/>] }
                    </ContextMenu>
                </div> }
            </div>
        </>
    );
}

export default FilledCell;