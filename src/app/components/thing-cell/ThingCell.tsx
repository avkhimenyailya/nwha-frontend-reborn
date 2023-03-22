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
        <div className={ classes.thingCellContainer }>
            <div
                onMouseEnter={ () => handleHover(true) }
                onMouseLeave={ () => handleHover(false) }
                className={ thingCellClasses.join(' ') }>

                {/* todo вынести в другие компоненты */ }
                {
                    profileTask &&
                    <>
                        {
                            hover
                                ? <>
                                    <img
                                        alt={ '?' }
                                        src={ iconPlus }
                                        draggable={ false }
                                        style={ { userSelect: 'none' } }
                                    />
                                </>
                                : <>
                                    {/* todo profileTask на чужом профиле */ }
                                </>
                        }
                    </>
                }

                {
                    thing &&
                    <>
                        <img
                            alt={ '?' }
                            draggable={ false }
                            style={ { objectFit: 'contain' } }
                            src={ thing.fileUrl }
                        />
                        {
                            hover &&
                            <div style={ { position: 'absolute', left: 0, bottom: -1 } }>
                                <ContextMenu buttons={ [
                                    <SmallButton value={ 'edit' } onClick={ () => console.log() }/>
                                ] }/>
                            </div>
                        }
                    </>
                }
            </div>
            <p>Info</p>
        </div>
    );
};

export default ThingCell;