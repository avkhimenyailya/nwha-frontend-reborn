import React, { useEffect, useState } from 'react';
import classes from './ZeroTask.module.css';
import QuestionComponent from '../../../components/question/QuestionComponent';
import Button from '../../../components/primitives/buttons/button /Button';
import Svg from '../../../components/primitives/svg/Svg';
import { useAppSelector } from '../../../store/store';
import { profileApi } from '../../../store/api/profileApi';
import { taskApi } from '../../../store/api/taskApi';
import { ProfileTask } from '../../../models/ProfileTask';
import { Answer } from '../../../models/Answer';
import { profileTaskApi } from '../../../store/api/profileTaskApi';

function ZeroTask() {
    const profileId = useAppSelector(state => state.authSlice.data?.profileId);
    const { data: task } = taskApi.useFetchTaskByOrdinalNumberQuery(0);
    const { data: profile } = profileApi.useFetchProfileByIdQuery(profileId!);

    const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersMutation();

    const [answers, setAnswers] = useState(new Map<number, Answer>()); // questionId <-> answer
    const [currentProfileTask, setCurrentProfileTask] = useState<ProfileTask>();
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        setCurrentProfileTask(profile?.profileTasks.find(x => x.task.id === 1));
    }, [profile]);

    useEffect(() => {
        const newMap = new Map<number, Answer>();
        currentProfileTask?.answers.map(a => newMap.set(a.questionId!, a));
        setAnswers(newMap);
    }, [currentProfileTask]);

    useEffect(() => {
        console.log(answers.size);
        setDisableButton(!(answers.size >= 7));
    }, [answers]);

    return (
        <div className={ classes.ZeroTask }>
            <div className={ classes.Content }>
                <div className={ classes.Task }>
                    <p className={ classes.TaskDescription }>
                        { task?.description }
                    </p>

                    <div className={ classes.Questions }>
                        { currentProfileTask && task?.questions.map(question => {
                                return <QuestionComponent
                                    key={ question.id }
                                    question={ question }
                                    answers={ answers }
                                    setAnswers={ setAnswers }
                                    profileTaskId={ currentProfileTask.id }/>;
                            }
                        ) }
                    </div>

                </div>
                <div className={ classes.Interface }>
                    <div className={ classes.BtnContainer }>
                        <p>
                            { disableButton
                                ? 'Answer all the questions before continuing'
                                : 'One click to go' }
                        </p>
                        <div className={ classes.BtnArrow }>
                            <Svg path={ require('./zero-task-index-arrow.light.svg').default }/>
                        </div>
                        <div className={ classes.BtnStart }>
                            <Button
                                disabled={ disableButton }
                                onClick={ () => {
                                    const answersWrap = {
                                        profileTaskId: currentProfileTask?.id!,
                                        answers: Array.from(answers.values())
                                    };
                                    updateAnswers(answersWrap);
                                } }
                                value={ 'start' }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZeroTask;

// const {
//     task, // задание
//     profileTask,
//     answers, // добавляем сюда ответы
//     complete, // вызываем функцию, когда хотим отправить ответы на сервер
//     isLoading, // загрузка ответов
//     isError // была ошибка при загрузке
// } = useProfileTaskHook(0);