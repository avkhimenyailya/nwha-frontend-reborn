import React from 'react';
import AuthPageComponent from '../AuthPage.component';
import { AuthRequest } from '../../../models/auth/request/AuthRequest';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { getAccessToken } from '../../../store/reducers/authSlice';

function RegisterPage() {
    const { invCode } = useParams();
    const dispatch = useAppDispatch();

    function attemptAuthorization(username: string, password: string) {
        const request: AuthRequest = {
            endpoint: 'register',
            data: { username, password, invitationCode: invCode }
        };
        dispatch(getAccessToken(request));
    }

    return (
        <AuthPageComponent
            usernamePlaceholder={ 'new nickname' }
            passwordPlaceholder={ 'new password' }
            attemptAuthorization={ attemptAuthorization }
        />
    );
}

export default RegisterPage;