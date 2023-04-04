import React from 'react';
import AuthPage from '../AuthPage';
import { useAppDispatch } from '../../../store/storeHooks';
import { AuthRequest } from '../../../models/auth/request/AuthRequest';
import { LoginRequest } from '../../../models/auth/request/LoginRequest';
import { doAuth } from '../../../store/reducers/authSlice';

function LoginPage() {
    const dispatch = useAppDispatch();

    function attemptAuthorization(username: string, password: string) {
        const authRequest: AuthRequest = {
            endpoint: 'login',
            request: { username, password } as LoginRequest
        };
        dispatch(doAuth(authRequest));
    }

    return (
        <AuthPage
            usernamePlaceholder={ 'nickname' }
            passwordPlaceholder={ 'password' }
            attemptAuthorization={ attemptAuthorization }
        />
    );
}

export default LoginPage;