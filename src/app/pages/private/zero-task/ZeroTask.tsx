import React, { useEffect, useState } from 'react';
import classes from './ZeroTask.module.css';
import QuestionComponent from '../../../components/question/QuestionComponent';
import Button from '../../../components/primitives/buttons/button /Button';
import { Answer } from '../../../models/Answer';
import { useProfileTaskHook } from '../../../hooks/useProfileTaskHook';

interface ZeroTaskProps {

}

function ZeroTask(props: ZeroTaskProps) {
    const {
        task, // задание
        profileTask,
        answers, // добавляем сюда ответы
        complete, // вызываем функцию, когда хотим отправить ответы на сервер
        isLoading, // загрузка ответов
        isError // была ошибка при загрузке
    } = useProfileTaskHook(0);

    const [disableStartButton, setDisableStartButton] = useState(true);

    useEffect(() => {
        isError && alert('Какая-то неприятная ошибка...');
    }, [isError]);


    function setAnswer(answer: Answer) {
        answers.set(answer.questionId!, answer);
        if (answers.size === 7) {
            setDisableStartButton(false);
        }
        console.log(answers);
    }

    function renderQuestions() {
        return task?.questions.map(question =>
            <QuestionComponent
                key={ question.id }
                question={ question }
                setAnswer={ setAnswer }
                profileTaskId={ profileTask?.id }/>
        );
    }

    return (
        <>
            <div className={ classes.ZeroTask }>
                <div className={ classes.Content }>
                    <div className={ classes.Task }>
                        <p className={ classes.TaskDescription }>
                            { task?.description }
                        </p>
                        <div className={ classes.Questions }>
                            { renderQuestions() }
                        </div>
                    </div>
                    <div className={ classes.Interface }>
                        <div className={ classes.BtnContainer }>
                            <p>
                                { disableStartButton
                                    ? 'Answer all the questions before continuing'
                                    : 'One click to go' }
                            </p>
                            <img
                                draggable={ false }
                                alt={ 'there should be a logo here' }
                                src={ require('../../../../static/icons/zero-task-index-arrow__light.svg').default }
                                className={ classes.BtnArrow }
                            />
                            <div className={ classes.BtnStart }>
                                <Button
                                    disabled={ disableStartButton }
                                    onClick={ complete }
                                    value={ 'start' }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ZeroTask;