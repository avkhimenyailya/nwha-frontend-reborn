import React, { useState } from 'react';
import classes from './InfoByHover.module.css';
import Svg from '../primitives/svg/Svg';

interface InfoByHoverProps {
    value: string;
}

function InfoByHover(props: InfoByHoverProps) {
    const [hover, setHover] = useState(false);

    return (
        <div className={ classes.InfoByHover }>
            <div
                className={ classes.Label }
                onMouseEnter={ _ => setHover(true) }
                onMouseLeave={ _ => setHover(false) }>
                <Svg path={ require('./info.light.svg').default }/>
            </div>
            {
                hover && <div className={ classes.MessageContainer }>
                    <p className={ classes.Message }>{ props.value }</p>
                </div>
            }
        </div>
    );
}

export default InfoByHover;