import React, {useEffect, useState} from 'react';
import Frame from '../Frame';
import {useAppSelector} from '../../../../../../store/store';

interface AsProps {

}

function As(props: AsProps) {
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
                        'The Altruistic / Separate line is responsible\nfor the points of support' :
                        'The Altruistic / Separate line is responsible for the points of support'}
                </p>
            }
            c1={{
                title: 'Altruistic (A)',
                img: <img alt={'???'} src={require(`./1-as.${theme}.png`)}/>,
                text: <p>
                    You find support in belonging and merging with the world around you. Your everyday life is flexible
                    and open to changes that come from the outside. The boundaries between the intimate and the public
                    are unclear. You are ready to sacrifice your comforts and habits for the purpose of circumstances
                    because you feel empathy for the outside world and a close connection to it. You are close to
                    reality, so you are affected by any changes in it.
                </p>
            }}
            c2={{
                title: 'Separate (S)',
                img: <img alt={'???'} src={require(`./2-as.${theme}.png`)}/>,
                text: <p>
                    You find sustainability in yourself and a constant search for your purpose. Your attention is solely
                    focused on your own world, and you don't care much about external circumstances, as your life's
                    purpose is the striving for an unstoppable ideal. You seem disconnected from reality as you focus on
                    thinking about yourself and your higher purpose.
                </p>
            }}
        />
    );
}

export default As;