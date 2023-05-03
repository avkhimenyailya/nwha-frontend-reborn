import React, { useState } from 'react';
import Swimmer from '../../swimmer/Swimmer';

interface ImgProps {
    imgUrl?: string;
}

function Img(props: ImgProps) {
    const [load, setLoad] = useState(false);

    return (
        <>
            <img
                onLoad={ _ => setLoad(true) }
                alt={ '?' } src={ props.imgUrl }
                style={ {
                    display: !load ? 'none' : 'block',
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                } }
            />
            { !load && <Swimmer/> }
        </>
    );
}

export default Img;