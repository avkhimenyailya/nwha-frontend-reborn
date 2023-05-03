import React, { useEffect, useRef, useState } from 'react';

export function useEventHandler() {
    const usernameFieldRef = useRef<HTMLInputElement>(null);
    const passwordFieldRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLInputElement>(null);

    const [event, setEvent] = useState<React.KeyboardEvent<HTMLInputElement>>();

    const handleInputEvent = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        setEvent(event);
    };

    useEffect(() => {
        switch (event?.target) {
            case usernameFieldRef.current:
                if (event?.key === 'Enter' || event?.key === 'ArrowDown') {
                    event.preventDefault();
                    passwordFieldRef.current?.focus();
                    passwordFieldRef.current?.select();
                }
                break;
            case passwordFieldRef.current:
                if (event?.key === 'Enter') {
                    event.preventDefault();
                    if (buttonRef.current?.disabled) return;
                    buttonRef.current?.classList.add('active');
                    buttonRef.current?.focus();
                } else if (event?.key === 'ArrowUp') {
                    event.preventDefault();
                    usernameFieldRef.current?.focus();
                    usernameFieldRef.current?.select();
                } else if (passwordFieldRef.current?.value.length === 0
                    && event?.key === 'Backspace') {
                    event.preventDefault();
                    usernameFieldRef.current?.focus();
                }
                break;
            case buttonRef.current:
                if (event?.type === 'keydown' && event?.key === 'Enter') {
                    event.preventDefault();
                    buttonRef.current?.classList.add('active');
                } else if (event?.key === 'Enter' && event?.type === 'keyup') {
                    event.preventDefault();
                    buttonRef.current?.click();
                    buttonRef.current?.classList.remove('active');
                } else if (event?.key === 'ArrowUp') {
                    event.preventDefault();
                    passwordFieldRef.current?.focus();
                    passwordFieldRef.current?.select();
                } else if (event?.key === 'Backspace') {
                    event.preventDefault();
                    passwordFieldRef.current?.focus();
                }
                break;
        }
    }, [event]);


    return {
        usernameFieldRef,
        passwordFieldRef,
        buttonRef,
        handleInputEvent
    };
}