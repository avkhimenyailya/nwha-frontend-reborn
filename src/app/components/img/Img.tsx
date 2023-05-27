import React from 'react'
import './Img.scss'
import {LazyLoadImage} from 'react-lazy-load-image-component'

export default function Img(props: { className?: string, src: string }) {

    return (
        <div className={props.className}>
            <LazyLoadImage
                alt={'?'}
                className="img"
                src={props.src} // use normal <img> attributes as props
            />
        </div>
    )
}