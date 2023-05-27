import React, {useEffect, useState} from 'react';
import AuthFormComponent from '../../components/auth-form/AuthForm.component';

import classes from './AuthPage.module.css';
import Loading from '../../components/loading/Loading';
import {useAppSelector} from '../../store/store';
import StringButton from "../../components/primitives/buttons/string-button/StringButton";
import {useLocation, useNavigate} from "react-router-dom";

interface AuthPageProps {
    submitValue: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    attemptAuthorization: { (username: string, password: string): void };
}

function AuthPageComponent(props: AuthPageProps) {
    const [isLoading, setLoading] = useState(false);

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const {errorMessage, status} = useAppSelector(state => state.authSlice);

    useEffect(() => {
        setLoading(status === 'loading');
    }, [status]);

    const navigate = useNavigate();
    const location = useLocation();

    function handleClick() {
        props.attemptAuthorization(usernameValue, passwordValue);
    }

    function renderAuthPageComponent() {
        return <div className={classes.AuthPageComponent}>
            <AuthFormComponent
                submitValue={props.submitValue}
                errorMessage={errorMessage}
                buttonOnClick={handleClick}
                usernameValue={usernameValue}
                passwordValue={passwordValue}
                usernameOnChange={setUsernameValue}
                passwordOnChange={setPasswordValue}
                usernamePlaceholder={props.usernamePlaceholder}
                passwordPlaceholder={props.passwordPlaceholder}
            />
            <div className={classes.GoTo}>
                <p className={classes.Or}>{'or'}</p>
                {
                    location.pathname === '/login'
                        ? <StringButton value={'register'} onClick={() => navigate('/register')}/>
                        : <StringButton value={'login'} onClick={() => navigate('/login')}/>
                }
            </div>
        </div>;
    }

    return (
        <>
            {isLoading ? <Loading/> : renderAuthPageComponent()}
        </>
    );
}

export default AuthPageComponent;