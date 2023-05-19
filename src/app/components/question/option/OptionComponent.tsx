import React from 'react';
import classes from '../QuestionComponent.module.css';
import { Option } from '../../../models/Option';
import { Answer } from '../../../models/Answer';

interface OptionProps {
    opt: Option;
    questionId: number;
    profileTaskId: number;
    answers: Map<number, Answer>;
    setAnswers: (map: Map<number, Answer>) => void;
}

function OptionComponent(props: OptionProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newMap = new Map<number, Answer>(props.answers);
        newMap.set(Number(event.target.name), {
            optionId: Number(event.target.value),
            questionId: Number(event.target.name),
            profileTaskId: props.profileTaskId
        });
        props.setAnswers(newMap);
    }

    return (
        <div key={ props.opt.id } className={ classes.Option }>
            <input
                type="radio"
                value={ props.opt.id }
                onChange={ handleChange }
                name={ String(props.questionId) }
                checked={ Array.from(props.answers.values()).some(a => a.optionId === props.opt.id) }
            />
            <p>{ props.opt.description }</p>
        </div>
    );
}

export default OptionComponent;