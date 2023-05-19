import { Answer } from '../models/Answer';
import { useEffect, useState } from 'react';
import { taskApi } from '../store/api/taskApi';
import { profileTaskApi } from '../store/api/profileTaskApi';

export function useProfileTaskHook(taskOrdinalNumber: number) {
    const { data: profileTasks } = profileTaskApi.useFetchProfileTasksByPrincipalQuery();
    const { data: task } = taskApi.useFetchTaskByOrdinalNumberQuery(taskOrdinalNumber); // for get all questions

    const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersByProfileTaskIdMutation();

    // получем нужное задание профиля
    const profileTask = profileTasks?.find(x => x.task.id === 1)!;

    const [answers] = useState(new Map<number, Answer>()); // questionId <-> answer

    useEffect(() => {
        console.log(profileTask);
        profileTask?.answers.forEach(a => answers.set(a.questionId!, a));
    }, [answers, profileTask]);

    useEffect(() => {
        if (isSuccess || isError) {
            answers.clear();
        }
    }, [answers, isSuccess, isError]);

    function complete() {
        // собираем для него ответы
        const answersWrap = {
            profileTaskId: profileTask.id,
            answers: Array.from(answers.values())
        };

        // отправялем на сервер
        updateAnswers(answersWrap);
        console.log(answers);
    }

    return {
        task, // задание
        profileTask,
        answers, // добавляем сюда ответы
        complete, // вызываем функцию, когда хотим отправить ответы на сервер
        isLoading, // загрузка ответов
        isError // была ошибка при загрузке
    };
}