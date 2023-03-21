import React, { FC } from 'react';
import classes from './ErrorMessage.module.css';

interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => {
    return (
        <div className={ classes.container }>
            <p>{ message }</p>
        </div>
    );
};

export default ErrorMessage;