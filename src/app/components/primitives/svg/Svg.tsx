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
            style={ { userSelect: 'none' } }
        />
    );
}

export default Svg;