import React from 'react';
import Frame from '../Frame';
import { useAppSelector } from '../../../../../../store/store';
import Img from '../../../../../../components/primitives/img/Img';

interface CpProps {

}

function Cp(props: CpProps) {
    const theme = useAppSelector(state => state.themeSlice.theme);

    return (
        <Frame
            description={
                <p>
                    { 'The Conductor / Producer line indicates the role\narrangement in your relationship with things and\nthe nature of your relationship with your home' }
                </p>
            }
            c1={ {
                title: 'Conductor (C)',
                img: <Img url={ require(`./1-cp.${ theme }.png`) }/>,
                text: <p>
                    Your attitude towards things can be compared to a human relationship: you tend to come into close
                    contact with them, establishing not only an emotional connection but also a bodily one: things seem
                    to become an extension of you, like organs of your body. That's why it's difficult to part with each
                    of your possessions. Your home is like an organism, a perfect system in which everything is
                    perfectly harmonised, each thing organically lives in the space with its own personality and
                    charisma. Each thing has a role or ritual attached to it, each thing has a meaning that only you can
                    understand.
                </p>
            } }
            c2={ {
                title: 'Producer (P)',
                img: <Img url={ require(`./2-cp.${ theme }.png`) }/>,
                text: <p>
                    You, not your things, are the centre of your home, while things are only subject to your needs and
                    desires. You don't get emotionally attached to things, you don't give them additional meanings
                    beyond the set of functions they serve, which makes it easy for you to part with things. Producer
                    prefers items that are mass-produced and easy to replace. The ideal thing for Producer is
                    multifunctional, as this keeps the number of things you need to do to a minimum. The space of your
                    home lacks a clear structure: rooms and things are not assigned roles, everyday rituals are not
                    attached to place and time.
                </p>
            } }
        />
    );
}

export default Cp;