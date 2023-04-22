import React, { useEffect } from 'react';
import classes from './ProfileTaskModal.module.css';
import { ProfileTask } from '../../../models/ProfileTask';
import QuestionComponent from '../../question/QuestionComponent';
import { Answer } from '../../../models/Answer';

interface ProfileTaskModalProps {
    answers: Map<number, Answer>;
    setAnswers: (map: Map<number, Answer>) => void;

    profileTask: ProfileTask;
    setDisableButton: (flag: boolean) => void;
}

function ProfileTaskModal(props: ProfileTaskModalProps) {

    useEffect(() => {
        if (props.answers.size === 1) {
            props.setDisableButton(false);
        }
    }, [props.answers, props]);

    useEffect(() => {
        return () => {
            props.setDisableButton(true);
            props.setAnswers(new Map<number, Answer>());
        };
    }, [props]);


    useEffect(() => {
        const newMap = new Map<number, Answer>();
        props.profileTask.answers.map(a => newMap.set(a.questionId!, a));
        props.setAnswers(newMap);
    }, [props.profileTask]);

    function renderTaskTitle() {
        return <p className={ classes.TaskOrdinalNumber }>
            { 'Task ' + props.profileTask.task.ordinalNumber + ' [' + props.profileTask.id + ']' }</p>;
    }

    function renderTaskDescription() {
        return <p className={ classes.TaskDescription }>
            { props.profileTask.task.description }</p>;
    }

    function renderTaskDetails() {
        return <p className={ classes.TaskDetails }>
            { props.profileTask.task.details }
        </p>;
    }

    function renderQuestion() {
        return props.profileTask
            .task
            .questions
            .map(q =>
                <QuestionComponent profileTaskId={ props.profileTask.id }
                                   question={ q } answers={ props.answers }
                                   setAnswers={ props.setAnswers }/>
            );
    }

    return (
        <div className={ classes.ProfileTaskModal }>
            { renderTaskTitle() }
            { renderTaskDescription() }
            { renderTaskDetails() }
            { renderQuestion() }
        </div>
    );
}

export default ProfileTaskModal;