import React from 'react';
import classes from './Frame.module.scss';

interface FrameProps {
    description?: React.ReactNode;
    c1: {
        title: string;
        img: React.ReactNode;
        text: React.ReactNode;
    };
    c2: {
        title: string;
        img: React.ReactNode;
        text: React.ReactNode;
    };
}

function Frame(props: FrameProps) {
    return (
        <div className={classes.Frame}>
            <div className={classes.Description}>
                {props.description}
            </div>
            <div className={classes.Content}>

                <div className={classes.Col}>
                    <p className={classes.Title}>{props.c1.title}</p>
                    <div className={classes.Img}>
                        {props.c1.img}
                    </div>
                    <div className={classes.Text}>
                        {props.c1.text}
                    </div>
                </div>

                <div className={classes.Col}>
                    <p className={classes.Title}>{props.c2.title}</p>
                    <div className={classes.Img}>
                        {props.c2.img}
                    </div>
                    <div className={classes.Text}>
                        {props.c2.text}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frame;