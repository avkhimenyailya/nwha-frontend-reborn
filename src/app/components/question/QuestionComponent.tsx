import React from 'react';
import classes from './QuestionComponent.module.css';
import { Question } from '../../models/Question';
import { Answer } from '../../models/Answer';
import OptionComponent from './option/OptionComponent';

interface QuestionProps {
    profileTaskId: number;
    question: Question;

    answers: Map<number, Answer>;
    setAnswers: (map: Map<number, Answer>) => void;
}

function QuestionComponent(props: QuestionProps) {
    return (
        <div className={ classes.Question }>
            <p className={ classes.QuestionTitle }>
                Question { props.question.ordinalNumber + ' [' + props.question.id + ']' || '???' }
            </p>
            <div className={ classes.Options }>
                {
                    props.question.options.map(opt =>
                        <OptionComponent
                            key={ opt.id }
                            opt={ opt }
                            questionId={ props.question.id }
                            profileTaskId={ props.profileTaskId }
                            answers={ props.answers }
                            setAnswers={ props.setAnswers }
                        />
                    )
                }
            </div>
        </div>
    );
}

export default QuestionComponent;