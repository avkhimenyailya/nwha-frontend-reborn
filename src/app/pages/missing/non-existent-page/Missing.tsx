import React from 'react';
import ErrorMessage from '../../../components/error-message/ErrorMessage';

interface NotFoundPageProps {

}

function Missing(props: NotFoundPageProps) {
    return (
        <div>
            <ErrorMessage message={ 'Not found page' }/>
        </div>
    );
}

export default Missing;