import React from 'react';
import ModalSkeleton from '../modal-skeleton/ModalSkeleton';
import Button from '../../primitives/buttons/button /Button';

interface ConfirmModalProps {
    confirm: () => void;
    setModalVisible: (flag: boolean) => void;
}

function ConfirmModal(props: ConfirmModalProps) {
    function handleConfirm() {
        props.confirm();
        props.setModalVisible(false);
    }

    return (
        <ModalSkeleton
            setModalVisible={ props.setModalVisible }
            buttons={ [
                <Button
                    value={ 'yes' }
                    borderSide={ true }
                    onClick={ () => handleConfirm() }
                    invertColor={ true }
                />,
                <Button
                    value={ 'no' }
                    borderSide={ true }
                    onClick={ () => props.setModalVisible(false) }
                />
            ] }>
            <div>
                <p>are you sure ? ( ﾟ，_ゝ｀)</p>
            </div>
        </ModalSkeleton>
    );
}

export default ConfirmModal;