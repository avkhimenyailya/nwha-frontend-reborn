import React from 'react';
import classes from './SettingPage.module.css';
import { useSettingHook } from './useSettingHook';
import StringButton from '../../../components/primitives/buttons/string-button/StringButton';
import Input from '../../../components/primitives/fields/input/Input';
import ChangePasswordModal from '../../../components/modal/setting/ChangePasswordModal';
import ChangeUsernameModal from '../../../components/modal/setting/ChangeUsernameModal';
import ConfirmModal from '../../../components/modal/confirm/ConfirmModal';

function SettingPage() {
    const {
        deleteProfile,
        newUsernameValue,
        oldPasswordValue,
        newPasswordValue,
        setNewUsernameValue,
        setNewPasswordValue,
        setOldPasswordValue,
        usernameFacadeValue,
        passwordFacadeValue,
        updateUsername,
        updatePassword,
        setUsernameFacadeValue,
        setPasswordFacadeValue,
        invitationCodeValue,
        setInvitationCodeValue,
        handleUsernameChangeButton,
        handlePasswordChangeButton,
        changeUsernameModalVisible,
        changePasswordModalVisible,
        setChangeUsernameModalVisible,
        setChangePasswordModalVisible,
        confirmDeleteProfileModalVisible,
        setConfirmDeleteProfileModalVisible
    } = useSettingHook();

    return (
        <div className={ classes.SettingPage }>
            { changeUsernameModalVisible &&
                <ChangeUsernameModal
                    save={ () => updateUsername() }
                    newUsernameValue={ newUsernameValue }
                    setNewUsernameValue={ setNewUsernameValue }
                    setModalVisible={ setChangeUsernameModalVisible }
                /> }
            { changePasswordModalVisible &&
                <ChangePasswordModal
                    oldPasswordValue={ oldPasswordValue }
                    setOldPasswordValue={ setOldPasswordValue }
                    newPasswordValue={ newPasswordValue }
                    setNewPasswordValue={ setNewPasswordValue }
                    save={ () => updatePassword() }
                    setModalVisible={ setChangePasswordModalVisible }
                /> }
            { confirmDeleteProfileModalVisible &&
                <ConfirmModal
                    confirm={ () => deleteProfile() }
                    setModalVisible={ setConfirmDeleteProfileModalVisible }
                /> }
            <div className={ classes.SettingContainer }>
                <div className={ classes.InputsContainer }>
                    <div className={ classes.InputContainer }>
                        <div className={ classes.InputLabel }>
                            <p>nickname</p>
                        </div>
                        <div className={ classes.Input }>
                            <Input
                                disableStyle={ true }
                                value={ usernameFacadeValue }
                                setValue={ setUsernameFacadeValue }
                                disabled={ true }
                            />
                        </div>
                        <div className={ classes.InputChangeButton }>
                            <StringButton
                                value={ 'change' }
                                onClick={ () => handleUsernameChangeButton() }
                                disabled={ true }
                            />
                        </div>
                    </div>
                    <div className={ classes.InputContainer }>
                        <div className={ classes.InputLabel }>
                            <p>password</p>
                        </div>
                        <div className={ classes.Input }>
                            <Input
                                disableStyle={ true }
                                value={ passwordFacadeValue }
                                setValue={ setUsernameFacadeValue }
                                disabled={ true }
                                password={ true }
                            />
                        </div>
                        <div className={ classes.InputChangeButton }>
                            <StringButton
                                value={ 'change' }
                                onClick={ () => handlePasswordChangeButton() }
                            />
                        </div>
                    </div>
                    <div className={ classes.InvitationCodeContainer }>
                        <div className={ classes.InvitationCodeLabels }>
                            <div className={ classes.InvitationCodeLabel }>
                                <p>your referral link</p>
                            </div>
                            <div className={ classes.InvitationsLeftCounter }>
                                <p>5 invitations left</p>
                            </div>
                        </div>
                        <div className={ classes.InvitationCodeInput }>
                            <Input
                                disabled={ true }
                                value={ invitationCodeValue }
                                setValue={ setInvitationCodeValue }
                            />
                        </div>
                    </div>
                </div>
                <div className={ classes.DeleteProfileButton }>
                    <StringButton
                        onClick={ () => setConfirmDeleteProfileModalVisible(true) }
                        value={ 'delete profile' }
                        disabled={ true }
                    />
                </div>
            </div>
        </div>
    );
}

export default SettingPage;