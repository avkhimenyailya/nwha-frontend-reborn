import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

function InvPage() {
    const { invCode } = useParams();

    return (
        <Navigate to={ '/register' } state={ { invCode: invCode } }/>
    );
}

export default InvPage;