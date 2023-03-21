import React, { FC } from 'react';
import classes from './Navigator.module.css';

interface NavigatorProps {

}

const Navigator: FC<NavigatorProps> = ({}: NavigatorProps) => {
    return (
        <div className={ classes.container }>
            <div className={ classes.navItem }>
                <p>Things</p>
            </div>
            <div className={ classes.navItem }>
                <p>Collections</p>
            </div>
            <div className={ classes.navItem }>
                <p>Archive</p>
            </div>
        </div>
    );
};

export default Navigator;