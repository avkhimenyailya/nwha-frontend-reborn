import React, { useEffect, useState } from 'react';
import classes from './ZeroTask.module.css';
import QuestionComponent from '../../../components/question/QuestionComponent';
import Button from '../../../components/primitives/buttons/button /Button';
import Svg from '../../../components/primitives/svg/Svg';
import { taskApi } from '../../../store/api/taskApi';
import { ProfileTask } from '../../../models/ProfileTask';
import { Answer } from '../../../models/Answer';
import { profileTaskApi } from '../../../store/api/profileTaskApi';
import { useNavigate } from 'react-router-dom';
import { profileApi } from '../../../store/api/profileApi';

function ZeroTask() {
    const { data: profile } = profileApi.useFetchProfileByPrincipalQuery();
    const { data: task } = taskApi.useFetchTaskByOrdinalNumberQuery(0);
    const { data: profileTasks } = profileTaskApi.useFetchProfileTasksByPrincipalQuery();
    const navigate = useNavigate();

    const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersByProfileTaskIdMutation();

    const [answers, setAnswers] = useState(new Map<number, Answer>()); // questionId <-> answer
    const [currentProfileTask, setCurrentProfileTask] = useState<ProfileTask>();
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        setCurrentProfileTask(profileTasks?.find(x => x.task.id === 1));
    }, [profileTasks]);

    useEffect(() => {
        // if (currentProfileTask?.answers.length === 7) {
        //     navigate(`/${ profile?.username }`);
        // }

        const newMap = new Map<number, Answer>();
        currentProfileTask?.answers.map(a => newMap.set(a.questionId!, a));
        setAnswers(newMap);
    }, [currentProfileTask]);

    useEffect(() => {
        setDisableButton(!(answers.size >= 7));
    }, [answers]);

    return (
        <div className={ classes.ZeroTask }>
            { profile &&
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
                                        updateAnswers(answersWrap).unwrap().then(_ => navigate(`/${ profile.username }`));

                                    } }
                                    value={ 'start' }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
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