import { useEffect, useState } from 'react';
import { userApi } from '../../../store/api/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export function useSettingHook() {
    const {
        data: user,
        isLoading: userIsLoading,
        isError: userIsError
    } = userApi.useFetchUserByPrincipalQuery();

    const [updUsername] = userApi.useUpdateUserUsernameMutation();
    const [updPassword] = userApi.useUpdateUserPasswordMutation();

    userApi.useUpdateUserUsernameMutation();
    userApi.useUpdateUserPasswordMutation();

    const [passwordFacadeValue, setPasswordFacadeValue] = useState('????????');
    const [usernameFacadeValue, setUsernameFacadeValue] = useState('');

    const [newUsernameValue, setNewUsernameValue] = useState('');
    const [oldPasswordValue, setOldPasswordValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');

    const [changeUsernameModalVisible, setChangeUsernameModalVisible] = useState(false);
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

    const [invitationCodeValue, setInvitationCodeValue] = useState('');

    const [confirmDeleteProfileModalVisible,
        setConfirmDeleteProfileModalVisible] = useState(false);

    function handleUsernameChangeButton() {
        setChangeUsernameModalVisible(true);
    }

    function handlePasswordChangeButton() {
        setChangePasswordModalVisible(true);
    }

    function updateUsername() {
        updUsername(newUsernameValue)
            .unwrap()
            .then(r => {
                // todo refresh token
                setChangeUsernameModalVisible(false);
            })
            .catch(err => {
                const error = err as FetchBaseQueryError;
                alert(JSON.stringify(error.data));
            });
    }

    function updatePassword() {
        updPassword({ oldPassword: oldPasswordValue, newPassword: newPasswordValue })
            .unwrap()
            .then(_ => {
                // todo refresh token
                setChangePasswordModalVisible(false);
            })
            .catch(err => {
                const error = err as FetchBaseQueryError;
                alert(JSON.stringify(error.data));
            });
    }

    function deleteProfile() {
        console.log('delete profile');
    }

    useEffect(() => {
        setUsernameFacadeValue('@' + user?.username!);
        setInvitationCodeValue('https://nothingtowritehomeabout.space/invite/'.concat(user?.invitationCode!));
    }, [user]);

    return {
        newUsernameValue,
        oldPasswordValue,
        newPasswordValue,
        setNewUsernameValue,
        setNewPasswordValue,
        setOldPasswordValue,
        usernameFacadeValue,
        passwordFacadeValue,
        invitationCodeValue,
        updateUsername,
        updatePassword,
        setUsernameFacadeValue,
        setPasswordFacadeValue,
        setInvitationCodeValue,
        handleUsernameChangeButton,
        handlePasswordChangeButton,
        changeUsernameModalVisible,
        setChangeUsernameModalVisible,
        changePasswordModalVisible,
        setChangePasswordModalVisible,
        confirmDeleteProfileModalVisible,
        setConfirmDeleteProfileModalVisible,
        deleteProfile
    };
}