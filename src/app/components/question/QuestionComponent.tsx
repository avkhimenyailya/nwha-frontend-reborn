import React from 'react';
import classes from './QuestionComponent.module.css';
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';

interface QuestionProps {
    answers?: Map<number, Answer>;
    question: Question;
    profileTaskId?: number;
    setAnswer: (answer: Answer) => void;
}

function QuestionComponent({ answers, question, profileTaskId, setAnswer }: QuestionProps) {

    const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({
            optionId: Number(event.target.value),
            questionId: Number(event.target.name),
            profileTaskId: profileTaskId
        });
    };

    function handleCheck(optId: number) {
        console.log('1');
        let flag = false;
        Array
            .from(answers ? answers.values() : [])
            .forEach(answer => {
                flag = answer.optionId === optId;
            });
        return flag;
    }

    function renderOptions() {
        return question?.options.map(opt => {
            return <div key={ opt.id } className={ classes.Option }>
                <input
                    type="radio"
                    name={ String(question.id) }
                    onChange={ handleRadio }
                    value={ opt.id }
                    checked={ handleCheck(opt.id) }
                />
                <p>{ opt.description }</p>
            </div>;
        });
    }

    return (
        <div className={ classes.Question }>
            <p className={ classes.QuestionTitle }>
                Question { question.ordinalNumber || '???' }
            </p>
            <div className={ classes.Options }>
                { renderOptions() }
            </div>
        </div>
    );
}

export default QuestionComponent;