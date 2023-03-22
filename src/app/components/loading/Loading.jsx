import React, { useEffect, useState } from 'react';
import classes from './Loading.module.css';

function Loading() {
    const delay = 200;
    const [loadingString, setLoadingString] = useState('');
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const parts = ['(ﾉ◕ヮ◕)ﾉ', '*:･', 'ﾟ✧', '✿*:', '･ﾟ✧', '✿'];
        setTimeout(() => {
            if (parts[counter]) {
                setLoadingString(prevState => prevState + parts[counter]);
                setCounter(prevState => prevState + 1);
            } else {
                setLoadingString('');
                setCounter(0);
            }
        }, delay);
    }, [counter]);

    return (
        <div className={ classes.container }>
            <div className={ classes.loading_string_container }>
                <span>{ loadingString }</span>
            </div>
        </div>
    );
}

export default Loading;