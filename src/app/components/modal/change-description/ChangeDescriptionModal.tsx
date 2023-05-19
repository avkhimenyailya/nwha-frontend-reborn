import React, {useEffect, useState} from 'react';
import classes from './ChangeDescriptionModal.module.css';
import ModalSkeleton from '../modal-skeleton/ModalSkeleton';
import Button from '../../primitives/buttons/button /Button';
import TextArea from '../../primitives/fields/text-area/TextArea';
import Input from '../../primitives/fields/input/Input';
import {Profile} from '../../../models/Profile';
import {profileApi} from '../../../store/api/profileApi';

interface ChangeDescriptionModalProps {
    profile: Profile;
    setModalVisible: (flag: boolean) => void;
}

function ChangeDescriptionModal(props: ChangeDescriptionModalProps) {
    const [descriptionValue, setDescriptionValue] = useState('');
    const [personalLinkValue, setPersonalLinkValue] = useState('');

    useEffect(() => {
        setDescriptionValue(props.profile.description ?? '');
        setPersonalLinkValue(props.profile.personalLink ?? '');
    }, [props.profile]);

    const [updProfileDescription] = profileApi.useUpdateProfileDescriptionMutation();
    const [updProfilePersonalLink] = profileApi.useUpdateProfilePersonalLinkMutation();

    function updateDescriptionAndPersonalLink() {
        updProfileDescription(descriptionValue.trim());
        updProfilePersonalLink(personalLinkValue.trim());
        props.setModalVisible(false);
    }

    return (
        <ModalSkeleton
            setModalVisible={props.setModalVisible}
            buttons={[
                <Button onClick={() => updateDescriptionAndPersonalLink()} value={'save'}/>
            ]}>
            <div className={classes.ChangeDescriptionModal}>
                <div className={classes.InputContainer}>
                    <p>Description editor</p>
                    <TextArea
                        rows={4}
                        maxLength={100}
                        value={descriptionValue}
                        onChange={e => setDescriptionValue(e.target.value)}
                        placeholder={'write a description here...'}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <p>Link</p>
                    <Input
                        value={personalLinkValue}
                        setValue={setPersonalLinkValue}
                        placeholder={'personal link'}
                    />
                </div>
            </div>
        </ModalSkeleton>
    );
}

export default ChangeDescriptionModal;