import React, {useEffect, useState} from 'react';
import Frame from '../Frame';
import {useAppSelector} from '../../../../../../store/store';

interface IeProps {

}

function Ie(props: IeProps) {
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
                        'The Introvert / Extrovert line is responsible for the\ninteraction of your home space with the world around you,\ndrawing boundaries between the outside and the inside' :
                        'The Introvert / Extrovert line is responsible for the interaction of your home space with the world around you, drawing boundaries between the outside and the inside'}
                </p>
            }
            c1={{
                title: 'Introvert (I)',
                img: <img alt={'???'} src={require(`./1-ie.${theme}.png`)}/>,
                text: <p>
                    You are more comfortable staying indoors and devoting your energies to filling your inner space than
                    to interacting with the outside world. You seldom have guests in your home, as your home is an
                    intimate enclosed space. You focus on the internal value of things rather than their attractive
                    appearance, so your home is dominated by functional objects.
                </p>
            }}
            c2={{
                title: 'Extravert (E)',
                img: <img alt={'???'} src={require(`./2-ie.${theme}.png`)}/>,
                text: <p>
                    Home is a secondary space to you, where you return to when you are in-between living in the outside
                    world. It is also important for you to keep your home presentable and attractive, as it is always
                    open to guests. You translate your domestic life outward through the prism of the image you have
                    created, and everything in your space, including things, conforms to the nature of
                    demonstrativeness.
                </p>
            }}
        />
    );
}

export default Ie;