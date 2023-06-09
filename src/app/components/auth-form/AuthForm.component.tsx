import React, {MouseEventHandler, useEffect, useState} from 'react';
import Input from '../primitives/fields/input/Input';
import Button from '../primitives/buttons/button /Button';
import classes from './AuthForm.module.css';
import LogoComponent from '../primitives/logo/Logo.component';
import {useEventHandler} from './hooks/event-handler-hook';
import ErrorMessage from '../error-message/ErrorMessage';

interface AuthFormComponentProps {
    submitValue: string;
    errorMessage?: string;
    usernameValue: string;
    passwordValue: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    usernameOnChange: { (value: string): void };
    passwordOnChange: { (value: string): void };
    buttonOnClick: MouseEventHandler<HTMLInputElement>;
}

function AuthFormComponent(props: AuthFormComponentProps) {
    let keyboardEventHandler = useEventHandler(); // todo rename

    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        setDisableButton(props.usernameValue.length === 0 || props.passwordValue.length === 0);
    }, [props.usernameValue.length, props.passwordValue.length]);


    return (
        <div className={classes.container}>
            {props.errorMessage && <ErrorMessage message={props.errorMessage}/>}
            <div className={classes.logoContainer}>
                <LogoComponent/>
            </div>
            <form className={classes.formContainer}>
                <div className={classes.usernameContainer}>
                    <Input
                        value={props.usernameValue}
                        placeholder={props.usernamePlaceholder}
                        setValue={props.usernameOnChange}
                        ref={keyboardEventHandler.usernameFieldRef}
                        onKeyDown={keyboardEventHandler.handleInputEvent}
                    />
                </div>
                <div className={classes.passwordContainer}>
                    <Input
                        password={true}
                        value={props.passwordValue}
                        placeholder={props.passwordPlaceholder}
                        setValue={props.passwordOnChange}
                        ref={keyboardEventHandler.passwordFieldRef}
                        onKeyDown={keyboardEventHandler.handleInputEvent}
                    />
                </div>
                <div className={classes.buttonStartContainer}>
                    <Button
                        value={props.submitValue}
                        disabled={disableButton}
                        onClick={props.buttonOnClick}
                        ref={keyboardEventHandler.buttonRef}
                        onKeyUp={keyboardEventHandler.handleInputEvent}
                        onKeyDown={keyboardEventHandler.handleInputEvent}
                    />
                </div>
            </form>
        </div>
    );
};

export default AuthFormComponent;
// const usernamePattern: string = '^[A-Za-z0-9]{3,32}';
// const passwordPattern: string = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';