import React, { FC, useState } from 'react';
import classes from './login-page.module.css';
import AuthorizationForm from '../../components/auth-form/authorization-form';

interface LoginPage2Props {

}

const usernamePlaceholder = 'nickname';
const passwordPlaceholder = 'password';

const TEST_ERROR_MESSAGE: string = 'very good and kind test error';
const SERVER_ERROR_MESSAGE: string = 'the server died .｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.';
const BAD_CREDENTIALS_MESSAGE: string = 'check your nickname and password again .｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.';

const LoginPage: FC<LoginPage2Props> = (props: LoginPage2Props) => {
    const [ errorMessage, setErrorMessage ] = useState(TEST_ERROR_MESSAGE);
    const [ nicknameValue, setNicknameValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');

    const attemptAuthorization = (): void => {
        console.log('attempt authorization');

        const random: number = Math.random() * 100;
        if (random > 50) {
            setErrorMessage(BAD_CREDENTIALS_MESSAGE);
        } else {
            setErrorMessage(SERVER_ERROR_MESSAGE);
        }
    };

    return (
        <div className={ classes.container }>
            <AuthorizationForm
                usernameValue={ nicknameValue }
                usernamePlaceholder={ usernamePlaceholder }
                usernameOnChange={ setNicknameValue }
                passwordValue={ passwordValue }
                passwordPlaceholder={ passwordPlaceholder }
                passwordOnChange={ setPasswordValue }
                buttonOnClick={ attemptAuthorization }
                errorMessage={ errorMessage }
            />
        </div>
    );
};

export default LoginPage;