import React from 'react';
import AuthPage from '../AuthPage';
import { useAppDispatch } from '../../../store/storeHooks';
import { AuthRequest } from '../../../models/auth/request/AuthRequest';
import { doAuth } from '../../../store/reducers/authSlice';
import { useParams } from 'react-router-dom';
import { RegisterRequest } from '../../../models/auth/request/RegisterRequest';

function RegisterPage() {
    const { invCode } = useParams();
    const dispatch = useAppDispatch();

    function attemptAuthorization(username: string, password: string) {
        const authRequest: AuthRequest = {
            endpoint: 'register',
            request: { username, password, invitationCode: invCode } as RegisterRequest
        };
        dispatch(doAuth(authRequest));
    }

    return (
        <AuthPage
            usernamePlaceholder={ 'new nickname' }
            passwordPlaceholder={ 'new password' }
            attemptAuthorization={ attemptAuthorization }
        />
    );
}

export default RegisterPage;