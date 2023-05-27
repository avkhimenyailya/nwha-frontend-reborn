import React, {useEffect, useState} from 'react';
import Frame from '../Frame';
import {useAppSelector} from '../../../../../../store/store';

interface MfProps {

}

function Mf(props: MfProps) {
    const theme = useAppSelector(state => state.themeSlice.theme);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Frame
            description={
                <p>
                    {!isMobile ?
                        'The Mind / Feeling line is responsible for the\nsource of decision-making in your everyday life' :
                        'The Mind / Feeling line is responsible for the source of decision-making in your everyday life'}
                </p>
            }
            c1={{
                title: 'Mind (M)',
                img: <img alt={'???'} src={require(`./1-mf.${theme}.png`)}/>,
                text: <p>
                    You are logical in your decision-making, you tend to structure your space and your everyday
                    processes. You have no difficulty planning your life regularly and following this plan. You buy new
                    things if there is a good reason or a need for it, and are motivated above all by the functionality
                    and objective usefulness that the thing can bring. You are not prone to impulsive decisions in
                    everyday life.
                </p>
            }}
            c2={{
                title: 'Feeling (F)',
                img: <img alt={'???'} src={require(`./2-mf.${theme}.png`)}/>,
                text: <p>
                    You trust your feelings to make decisions. Your day is rather unstructured, as many of your actions
                    are mood-driven, which can make them impulsive. You tend to animate your belongings and spaces, or
                    at the very least make an emotional connection to the domestic world.
                </p>
            }}
        />
    );
}

export default Mf;