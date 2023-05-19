import React from 'react';
import classes from './FileLoadBar.module.css';

interface FileLoadBarProps {
    percent: number;
}

function FileLoadBar(props: FileLoadBarProps) {
    return (
        <div className={classes.FileLoadBar}>
            <div className={classes.Bar}>
                <div
                    style={{width: (2.42 * props.percent) + 'px'}}
                    className={classes.Line}
                />
            </div>
        </div>
    );
}

export default FileLoadBar;