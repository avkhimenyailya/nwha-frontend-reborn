import React, { useEffect, useState } from 'react';
import classes from './Modal.module.css';
import { useKeyPress } from '../../hooks/key-press.hook';
import Button from '../primitives/buttons/button /Button';

interface ModalComponentProps {
    content?: React.ReactNode;
    setShowModal: (flag: boolean) => void;
}

function Modal({ setShowModal, content }: ModalComponentProps) {
    const keyPressed: boolean = useKeyPress('Escape');
    const [disableBtnSave, setDisableBtnSave] = useState(true);

    useEffect(() => {
        setShowModal(!keyPressed);
    }, [setShowModal, keyPressed]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    function submit() {

    }

    return (
        <div className={ classes.ModalArea }>
            <div className={ classes.Modal }>
                <p onClick={ () => setShowModal(false) } className={ classes.EscBtn }>[ esc ]</p>
                <div className={ classes.ModalContent }>
                    { content }
                    {/*<div className={ classes.SubmitBtn }>*/}
                    {/*    <Button disabled={ disableBtnSave } value={ 'save' } onClick={ submit }/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>

    );
}

export default Modal;