import React from 'react';
import classes from './QuestionComponent.module.css';
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';

interface QuestionProps {
    question: Question;
    profileTaskId?: number;
    setAnswer: (answer: Answer) => void;
}

function QuestionComponent({ question, profileTaskId, setAnswer }: QuestionProps) {

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer({
            optionId: Number(event.target.value),
            questionId: Number(event.target.name),
            profileTaskId: profileTaskId
        });
    };

    function renderOptions() {
        return question?.options.map(opt => {
            return <div key={ opt.id } className={ classes.Option }>
                <input
                    type="radio"
                    name={ String(question.id) }
                    onChange={ radioHandler }
                    value={ opt.id }
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