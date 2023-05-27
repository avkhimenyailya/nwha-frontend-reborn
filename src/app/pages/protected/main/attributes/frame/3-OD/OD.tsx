import React, {useEffect, useState} from 'react';
import Frame from '../Frame';
import {useAppSelector} from '../../../../../../store/store';

interface OdProps {

}

function Od(props: OdProps) {
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
                        'The Order / Disorder line is responsible for\nhow you organise and interact with your space' :
                        'The Order / Disorder line is responsible for how you organise and interact with your space'}
                </p>
            }
            c1={{
                title: 'Order (O)',
                img: <img alt={'???'} src={require(`./1-od.${theme}.png`)}/>,
                text: <p>
                    Your nature of interaction with space can be described as controlling. You feel power over your
                    space and set the rules for its existence yourself. When organising your everyday life, you think
                    things through to the last detail, planning ahead. Discipline makes you feel safe and secure. The
                    rules and structure make your home a safe and clear place for you.
                </p>
            }}
            c2={{
                title: 'Disorder (D)',
                img: <img alt={'???'} src={require(`./2-od.${theme}.png`)}/>,
                text: <p>
                    The main rule in your home is that there are no rules. Your schedule is very flexible, one could say
                    there is none, as it changes from day to day. Your daily space is chaotic and disorganised, and it
                    is often a mess, which makes you no less comfortable to be inside it. Things aren't assigned
                    specific places; they move freely between and within rooms. It is important for you to feel free and
                    relaxed in your home.
                </p>
            }}
        />
    );
}

export default Od;