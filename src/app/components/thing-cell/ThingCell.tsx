import React, { FC, useState } from 'react';
import classes from './ThingCell.module.css';
import { Thing } from '../../models/Thing';
import { ProfileTask } from '../../models/ProfileTask';
import ContextMenu from '../contex-menu/ContextMenu';
import SmallButton from '../primitives/buttons/small-button/SmallButton';

const iconPlus = require('./plus.svg').default;

interface ThingCellProps {
    thing?: Thing;
    profileTask?: ProfileTask;
}

const ThingCell: FC<ThingCellProps> = ({ thing, profileTask }: ThingCellProps) => {
    const [ hover, setHover ] = useState(false);

    const handleHover = (flag: boolean) => {
        setHover(flag);
    };

    const thingCellClasses: string[] = [
        classes.container,
        hover && classes.cellHover,
        thing && classes.thingContainer,
        profileTask && classes.profileTaskContainer
    ];

    return (
        <div
            onMouseEnter={ () => handleHover(true) }
            onMouseLeave={ () => handleHover(false) }
            className={ thingCellClasses.join(' ') }>
            { (hover && profileTask) && <img style={{border: '1px solid red'}} alt={ '?' } src={ iconPlus }/> }
            { thing &&
                <>
                    <img style={ { objectFit: 'contain' } } alt={ '?' } src={ thing?.fileUrl }/>
                    { hover &&
                        <div style={ { position: 'absolute', bottom: -1 } }>
                            <ContextMenu buttons={ [
                                <SmallButton value={ 'edit' } onClick={ () => console.log() }/>,
                                <SmallButton value={ 'edit' } onClick={ () => console.log() }/>
                            ] }/>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default ThingCell;