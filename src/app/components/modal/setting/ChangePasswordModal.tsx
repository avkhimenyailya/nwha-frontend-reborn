import React, { useEffect, useRef, useState } from 'react';
import classes from './SettingModal.module.css';
import ModalSkeleton from '../modal-skeleton/ModalSkeleton';
import Input from '../../primitives/fields/input/Input';
import Button from '../../primitives/buttons/button /Button';

interface ChangePasswordModalProps {
    setModalVisible: (flag: boolean) => void;
    save: () => void;

    oldPasswordValue: string;
    setOldPasswordValue: (value: string) => void;

    newPasswordValue: string;
    setNewPasswordValue: (value: string) => void;
}

function ChangePasswordModal(props: ChangePasswordModalProps) {
    const [disableButtonSave, setDisableButtonSave] = useState(true);

    const oldPasswordInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDisableButtonSave(
            !(props.oldPasswordValue.length >= 8 && props.newPasswordValue.length >= 8)
        );
    }, [props.oldPasswordValue, props.newPasswordValue]);

    useEffect(() => {
        oldPasswordInputRef.current?.focus();
    }, []);

    function handleSaveBtn() {
        props.save();
    }

    return (
        <ModalSkeleton
            setModalVisible={ props.setModalVisible }
            buttons={ [
                <Button
                    disabled={ disableButtonSave }
                    onClick={ () => handleSaveBtn() }
                    value={ 'save' }
                    borderSide={ true }
                />
            ] }>
            <div className={ classes.ChangePasswordInputsContainer }>
                <Input
                    value={ props.oldPasswordValue }
                    ref={ oldPasswordInputRef }
                    setValue={ props.setOldPasswordValue }
                    placeholder={ 'old password' }
                    password={ true }
                />
                <Input
                    value={ props.newPasswordValue }
                    setValue={ props.setNewPasswordValue }
                    placeholder={ 'new password / min 6 chars' }
                    password={ true }
                />
            </div>
        </ModalSkeleton>
    );
}

export default ChangePasswordModal;