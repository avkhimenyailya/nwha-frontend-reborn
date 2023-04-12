import React, { FC } from 'react';
import classes from './ContextMenu.module.css';

interface ContextMenuProps {
    children?: React.ReactElement[];
    handleHover?: (flag: boolean) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ children, handleHover }: ContextMenuProps) => {
    return (
        <div
            onMouseEnter={ () => handleHover && handleHover(true) }
            onMouseLeave={ () => handleHover && handleHover(false) }
            className={ classes.container }>
            { children }
        </div>
    );
};

export default ContextMenu;