import React, {useEffect} from 'react';
import AuthPageComponent from '../AuthPage.component';
import {AuthRequest} from '../../../models/auth/request/AuthRequest';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getAccessToken} from '../../../store/reducers/authSlice';

function RegisterPage() {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {status, data} = useAppSelector(state => state.authSlice);

    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'successfully') {
            navigate(`/start`);
        }
    }, [data?.username, navigate, status]);

    function attemptAuthorization(username: string, password: string) {
        const request: AuthRequest = {
            endpoint: 'register',
            data: {username, password, invitationCode: location?.state?.invCode ?? ''}
        };
        dispatch(getAccessToken(request));
    }

    return (
        <AuthPageComponent
            submitValue={'start'}
            usernamePlaceholder={'new nickname'}
            passwordPlaceholder={'new password'}
            attemptAuthorization={attemptAuthorization}
        />
    );
}

export default RegisterPage;