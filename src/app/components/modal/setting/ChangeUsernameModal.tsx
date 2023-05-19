import React, { useEffect, useRef, useState } from 'react';
import Button from '../../primitives/buttons/button /Button';
import Input from '../../primitives/fields/input/Input';
import ModalSkeleton from '../modal-skeleton/ModalSkeleton';

interface ChangeUsernameModalProps {
    save: () => void;
    setModalVisible: (flag: boolean) => void;
    newUsernameValue: string;
    setNewUsernameValue: (value: string) => void;
}

function ChangeUsernameModal(props: ChangeUsernameModalProps) {
    const newUsernameInputRef = useRef<HTMLInputElement>(null);
    const [disableButtonSave, setDisableButtonSave] = useState(true);

    useEffect(() => {
        newUsernameInputRef.current?.focus();
    }, []);

    useEffect(() => {
        setDisableButtonSave(!(props.newUsernameValue.length >= 6));
    }, [props.newUsernameValue]);

    function handleSaveBtn() {
        props.save();
    }

    return (
        <ModalSkeleton
            setModalVisible={ props.setModalVisible }
            buttons={ [
                <Button
                    value={ 'save' }
                    disabled={ disableButtonSave }
                    onClick={ () => handleSaveBtn() }
                    borderSide={ true }
                />
            ] }>
            <Input
                value={ props.newUsernameValue }
                setValue={ props.setNewUsernameValue }
                placeholder={ 'new username / min 6 chars' }
                ref={ newUsernameInputRef }
            />
        </ModalSkeleton>
    );
}

export default ChangeUsernameModal;