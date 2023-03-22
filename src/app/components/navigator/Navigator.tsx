import React, { FC } from 'react';
import classes from './Navigator.module.css';

interface NavigatorProps {

}

const Navigator: FC<NavigatorProps> = ({}: NavigatorProps) => {
    return (
        <div className={ classes.navigator }>
            <p className={ classes.item }>Things</p>
            <p className={ classes.item }>Collections</p>
            <p className={ classes.item }>Archive</p>
        </div>
    );
};

export default Navigator;