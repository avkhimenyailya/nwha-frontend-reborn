import React from 'react';

function Udwarn() {
    return (
        <div style={ {
            position: 'fixed',
            right: 0,
            left: 0,
            bottom: 0
        } }>
            <p style={ {
                background: 'var(--sub-color2)',
                color: 'var(--main-color)'
            } }>! page/module is under development</p>
        </div>
    );
}

export default Udwarn;