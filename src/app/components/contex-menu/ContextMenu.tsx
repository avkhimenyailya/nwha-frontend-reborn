import React, {useEffect, useRef} from 'react';
import classes from './ContextMenu.module.css';

interface ContextMenuProps {
    children: React.ReactNode;
    setShowContextMenu?: (flag: boolean) => void;

    /* if the menu is called by a trigger */
    triggerRef?: React.MutableRefObject<HTMLDivElement | null>;
}

function ContextMenu(props: ContextMenuProps) {
    const contextMenuRef = useRef<HTMLDivElement>(null);

    /* close menu on click from outside */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)
                && !props.triggerRef?.current?.contains(event.target as Node)) {
                if (props.setShowContextMenu) {
                    props.setShowContextMenu(false);
                }
            }
        }

        document.addEventListener('mousedown', event => handleClickOutside(event));
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenuRef, props]);

    return (
        <div
            ref={contextMenuRef}
            className={classes.ContextMenu}>
            {props.children}
        </div>
    );
};

export default ContextMenu;