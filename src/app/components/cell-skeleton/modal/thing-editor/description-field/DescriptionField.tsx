import React, { useRef } from 'react';
import classes from './DescriptionField.module.css';


interface DescriptionFieldProps {
    thingDescr?: string;
    setThingDescr: (descr: string) => void;
}

function DescriptionField(props: DescriptionFieldProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={ classes.DescriptionField }>
            <textarea
                value={ props.thingDescr }
                onChange={ (event) => props.setThingDescr(event.target.value) }
                maxLength={ 210 }
                ref={ textAreaRef }
                placeholder={ 'write a description here...' }
                className={ classes.InputField }/>
            <p className={ classes.LetterCounter }>{ props.thingDescr ? props.thingDescr.length : 0 } / 210</p>
        </div>
    );
}

export default DescriptionField;