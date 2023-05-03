import React, { useEffect } from 'react';
import AuthPageComponent from '../AuthPage.component';
import { AuthRequest } from '../../../models/auth/request/AuthRequest';
import { LoginRequest } from '../../../models/auth/request/LoginRequest';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getAccessToken } from '../../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const dispatch = useAppDispatch();
    const { status, data } = useAppSelector(state => state.authSlice);

    const navigate = useNavigate();
    useEffect(() => {
        if (status === 'successfully') {
            navigate(`/today`);
        }
    }, [data?.username, navigate, status]);

    function attemptAuthorization(username: string, password: string) {
        const authRequest: AuthRequest = {
            endpoint: 'login',
            data: { username, password } as LoginRequest
        };
        dispatch(getAccessToken(authRequest));
    }

    return (
        <AuthPageComponent
            usernamePlaceholder={ 'nickname' }
            passwordPlaceholder={ 'password' }
            attemptAuthorization={ attemptAuthorization }
        />
    );
}

export default LoginPage;