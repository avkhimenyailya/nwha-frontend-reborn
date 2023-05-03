import React, { useEffect, useState } from 'react';
import Svg from '../primitives/svg/Svg';

interface HerbariumProps {

}

function Herbarium(props: HerbariumProps) {
    const [currentHerbarium, setCurrentHerbarium] = useState<React.ReactNode>();
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const parts = [
            <Svg path={ require('./Property 1=A6 - 21.svg').default }/>,
            <Svg path={ require('./Property 1=A6 - 24.svg').default }/>,
            <Svg path={ require('./Property 1=A6 - 25.svg').default }/>,
            <Svg path={ require('./Property 1=A6 - 26.svg').default }/>,
            <Svg path={ require('./Property 1=A6 - 27.svg').default }/>
        ];
        setTimeout(() => {
            if (parts[counter]) {
                setCurrentHerbarium(parts[counter]);
                setCounter(prevState => prevState + 1);
            } else {
                setCounter(0);
            }
        }, 100);
    }, [counter]);

    return (
        <div>
            { currentHerbarium }
        </div>
    );
}

export default Herbarium;