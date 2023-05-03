import React, { useRef } from 'react';
import classes from './DescriptionField.module.css';
import { Thing } from '../../../../../models/Thing';


interface DescriptionFieldProps {
    thing: Thing;
    setThing: (thing: Thing) => void;
}

function DescriptionField(props: DescriptionFieldProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={ classes.DescriptionField }>
            <textarea
                value={ props.thing.description! }
                onChange={ (event) => props.setThing({ ...props.thing, description: event.target.value }) }
                maxLength={ 210 }
                ref={ textAreaRef }
                placeholder={ 'write a description here...' }
                className={ classes.InputField }/>
            <p className={ classes.LetterCounter }>{ props.thing.description ? props.thing.description.length : 0 } /
                210</p>
        </div>
    );
}

export default DescriptionField;