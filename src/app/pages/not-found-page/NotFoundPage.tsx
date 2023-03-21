import React from 'react';
import classes from './NotFoundPage.module.css';
import ErrorMessage from '../../components/error-message/ErrorMessage';

const NotFoundPage = () => {
    return (
        <div className={ classes.container }>
            <ErrorMessage message={ 'Not found page' }/>
        </div>
    );
};

export default NotFoundPage;