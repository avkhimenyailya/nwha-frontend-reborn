import React from 'react';

interface SvgProps {
    path: string;
}

function Svg(props: SvgProps) {
    return (
        <img
            alt={ '?' }
            src={ props.path }
            draggable={ false }
            style={ { userSelect: 'none', width: 'min-content' } }
        />
    );
}

export default Svg;