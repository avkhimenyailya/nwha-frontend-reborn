import React, { FC } from 'react';
import classes from './ContextMenu.module.css';

interface ContextMenuProps {
    buttons?: React.ReactNode[];
    handleHover?: (flag: boolean) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ handleHover, buttons }: ContextMenuProps) => {
    return (
        <div
            onMouseEnter={ () => handleHover && handleHover(true) }
            onMouseLeave={ () => handleHover && handleHover(false) }
            className={ classes.container }>
            { React.Children.map(buttons, (child) => child) }
        </div>
    );
};

export default ContextMenu;