import React, {LegacyRef, MouseEventHandler} from 'react';
import classes from './SmallButton.module.css';

interface SmallButtonProps {
    disabled?: boolean;
    value?: string;
    innerRef?: React.MutableRefObject<HTMLInputElement | undefined>;
    onClick: MouseEventHandler<HTMLInputElement>;
}

export function SmallButton(props: SmallButtonProps) {
    return (
        <input
            ref={props.innerRef as LegacyRef<HTMLInputElement>}
            type={'button'}
            disabled={props.disabled}
            value={props.value || 'btn'}
            onClick={props.onClick}
            className={classes.smallButton}
        />
    );
}

export default SmallButton;