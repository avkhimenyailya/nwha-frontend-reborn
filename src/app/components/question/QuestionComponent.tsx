import React from 'react';
import classes from './Question.module.css';
import { Question } from '../../models/Question';

interface QuestionProps {
    question: Question;
}

function QuestionComponent({ question }: QuestionProps) {
    return (
        <>
            <p className={ classes.QuestionTitle }>Question { question.ordinalNumber }</p>
            <div className={ classes.Question }>
                {
                    question?.options.map(opt => {
                        return <div key={ opt.id } className={ classes.Option }>
                            <input type="radio" name={ question.id.toString() }/>
                            <p>{ opt.description }</p>
                        </div>;
                    })
                }
            </div>
        </>

    );
}

export default QuestionComponent;