import React, { useEffect, useState } from 'react';
import AuthorizationForm from '../../components/auth-form/authorization-form';

import classes from './AuthPage.module.css';
import { useAppSelector } from '../../store/storeHooks';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

const USERNAME_PLACEHOLDER: string = 'nickname';
const PASSWORD_PLACEHOLDER: string = 'password';

const TEST_ERROR_MESSAGE: string = 'very good and kind test error';
const SERVER_ERROR_MESSAGE: string = 'the server died .｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.';
const BAD_CREDENTIALS_MESSAGE: string = 'check your nickname and password again .｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.';

interface AuthPageProps {
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    attemptAuthorization: { (username: string, password: string): void };
}

function AuthPage(props: AuthPageProps) {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setLoading] = useState(false);

    const { status, data, errorMsg } = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    function handleClick() {
        props.attemptAuthorization(usernameValue, passwordValue);

        // localStorage.setItem('nwha-access-token',
        //     JSON.stringify(data?.accessToken));
        // localStorage.setItem('nwha-refresh-token',
        //     JSON.stringify(data?.accessToken));
        // localStorage.setItem('nwha-profile-id',
        //     JSON.stringify(data?.accessToken));
        // localStorage.setItem('nwha-roles',
        //     JSON.stringify(data?.accessToken));
    }

    function renderAuthForm() {
        return (
            <AuthorizationForm
                usernameValue={ usernameValue }
                usernamePlaceholder={ props.usernamePlaceholder }
                usernameOnChange={ setUsernameValue }
                passwordValue={ passwordValue }
                passwordPlaceholder={ props.passwordPlaceholder }
                passwordOnChange={ setPasswordValue }
                buttonOnClick={ handleClick }
                errorMessage={ errorMsg }
            />
        );
    }


    useEffect(() => {
        switch (status) {
            case 'loading':
                setLoading(true);
                break;
            case 'error':
                loadingDisable();
                break;
            case 'successfully':
                loadingDisable();
                break;
        }
        if (data) {
            localStorage.setItem('nwha-data', JSON.stringify(data));
            setTimeout(() => {
                navigate('/');
            }, 3000)
        }
    }, [data, navigate, status]);

    function loadingDisable() {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    return (
        <div className={ classes.AuthPage }>
            { isLoading ? <Loading/> : renderAuthForm() }
        </div>
    );
}

export default AuthPage;