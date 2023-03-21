import React, { FC } from 'react';
import classes from './SmallMenu.module.css';

interface SmallMenuProps {
    smallButtons: JSX.Element[];
}

const SmallMenu: FC<SmallMenuProps> = ({ smallButtons }: SmallMenuProps) => {
    return (
        <div className={ classes.container }>
            {
                smallButtons.map(smallButton => {
                    smallButton.key = Math.random() * 100000;
                    return smallButton;
                })
            }
        </div>
    );
};

export default SmallMenu;