import React, {useEffect} from 'react';
import classes from './ModalSkeleton.module.css';
import {useEscapeKey} from './useEscapeKey';

interface ModalSkeletonProps {
    children?: React.ReactNode;
    buttons?: React.ReactNode[];

    confirm?: boolean;
    setModalVisible: (flag: boolean) => void;
}

function ModalSkeleton(props: ModalSkeletonProps) {
    useEscapeKey(() => {
        props.setModalVisible(false);
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={classes.ModalSkeletonArea}>
            <div className={classes.ModalSkeleton}>
                <p
                    onClick={() => props.setModalVisible(false)}
                    className={classes.EscapeButton}>
                    {'[ esc ]'}
                </p>
                <div style={{position: 'relative'}}>
                    <div className={classes.ModalContainer}>
                        <div className={classes.ModalContent}>
                            {props.children}
                        </div>
                    </div>
                    <div className={classes.ButtonsContainer}>
                        {props.buttons?.map((button, index) =>
                            <React.Fragment key={index}>
                                {button}
                            </React.Fragment>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSkeleton;