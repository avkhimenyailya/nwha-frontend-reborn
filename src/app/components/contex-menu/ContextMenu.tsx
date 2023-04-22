import React, { FC } from 'react';
import classes from './ContextMenu.module.css';

interface ContextMenuProps {
    children: React.ReactNode;
    handleHover?: (flag: boolean) => void;
}

const ContextMenu: FC<ContextMenuProps> = (props: ContextMenuProps) => {
    return (
        <div
            onMouseEnter={ () => props.handleHover && props.handleHover(true) }
            onMouseLeave={ () => props.handleHover && props.handleHover(false) }
            className={ classes.container }>
            { props.children }
        </div>
    );
};

export default ContextMenu;