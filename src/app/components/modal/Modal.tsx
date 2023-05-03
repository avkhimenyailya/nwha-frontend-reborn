import React, { MouseEventHandler, useEffect } from 'react';
import classes from './Modal.module.css';
import { useKeyPress } from '../../hooks/key-press.hook';

interface ModalProps {
    children: React.ReactNode;
    setModalVisible: (flag: boolean) => void;

    disableButton: boolean;
    onClickSave: MouseEventHandler<HTMLInputElement>;
}

function Modal(props: ModalProps) {
    const keyPressed: boolean = useKeyPress('Escape');

    useEffect(() => {
        props.setModalVisible(!keyPressed);
    }, [keyPressed, props]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={ classes.ModalArea }>
            <div className={ classes.Modal }>
                <p
                    onClick={ () => props.setModalVisible(false) }
                    className={ classes.EscBtn }>
                    { '[ esc ]' }
                </p>
                <div className={ classes.ModalContent }>
                    { props.children }
                </div>
            </div>
        </div>
    );
}

export default Modal;