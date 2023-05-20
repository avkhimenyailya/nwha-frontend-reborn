import React, {Suspense} from 'react'
import './Img.scss'
import {useImage} from 'react-image'
import Swimmer from "../swimmer/Swimmer";

function ReactImg(props: { src: string }) {
    const {src} = useImage({
        srcList: [props.src, 'https://media.tenor.com/-SV9TjUGabMAAAAC/hacker-python.gif']
    })

    return <img
        src={src}
        alt={'?'}
        className="img"
        draggable={false}
    />
}

export default function Img(props: { className?: string, src: string }) {
    return (
        <div className={props.className}>
            <Suspense fallback={<Swimmer/>}>
                <ReactImg src={props.src}/>
            </Suspense>
        </div>
    )
}