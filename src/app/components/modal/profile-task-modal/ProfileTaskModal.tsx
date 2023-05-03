import React, { useEffect, useState } from 'react';
import classes from './ProfileTaskModal.module.css';
import { ProfileTask } from '../../../models/ProfileTask';
import QuestionComponent from '../../question/QuestionComponent';
import { Answer } from '../../../models/Answer';
import Button from '../../primitives/buttons/button /Button';
import DropArea from './drop-area/DropArea';
import ThingEditor from './thing-editor/ThingEditor';
import { Thing } from '../../../models/Thing';
import { thingApi } from '../../../store/api/thingApi';
import FileLoadBar from './file-load-bar/FileLoadBar';
import { useFileUploader } from './useFileUploader';
import { profileTaskApi } from '../../../store/api/profileTaskApi';

interface ProfileTaskModalProps {
    profileTask: ProfileTask;
    setShowProfileTaskModal: (flag: boolean) => void;
}

function ProfileTaskModal(props: ProfileTaskModalProps) {
    const [disableSaveButton, setDisableSaveButton] = useState(true);
    const [answers, setAnswers] = useState(new Map<number, Answer>());

    const {
        logic,

        file,
        setFile,
        setFileUrl,

        fileUrl,
        progress,
        isUploading
    } = useFileUploader();

    // thing editor
    const [thing, setThing] = useState<Thing>(props.profileTask.thing ?? { profileTaskId: props.profileTask.id } as Thing);

    // drop area
    const [createThing] = thingApi.useCreateMutation();
    const [update] = thingApi.useUpdateMutation();

    const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersMutation();

    useEffect(() => {
        setDisableSaveButton(!Boolean(answers.size === 1 && (fileUrl || thing.id)));
    }, [answers, fileUrl, thing]);

    useEffect(() => {
        if (file) {
            logic();
        }
    }, [file]);

    useEffect(() => {
        const newMap = new Map<number, Answer>();
        props.profileTask.answers.map(a => newMap.set(a.questionId!, a));
        setAnswers(newMap);
    }, [props.profileTask]);

    function save() {
        if (thing.id) {
            update({ ...thing });
        } else {
            createThing({ ...thing, fileUrl });
        }
        updateAnswers({
            profileTaskId: props.profileTask.id,
            answers: Array.from(answers.values())
        });
        props.setShowProfileTaskModal(false);
    }

    function renderTaskTitle() {
        return <p className={ classes.TaskOrdinalNumber }>
            { 'Task ' + props.profileTask.task.ordinalNumber }</p>;
    }

    function renderTaskDescription() {
        return <p className={ classes.TaskDescription }>
            { props.profileTask.task.description.replaceAll('%%%', ' ') }</p>;
    }

    function renderThingEditor() {
        return (fileUrl || thing.id) &&
            <div className={ classes.ThingEditor }>
                <ThingEditor
                    fileUrl={ fileUrl }
                    setFileUrl={ setFileUrl }
                    thing={ thing }
                    setThing={ setThing }
                />
            </div>;
    }

    function renderDropArea() {
        return (!thing?.id && !fileUrl && !isUploading) &&
            <div className={ classes.DropArea }>
                <DropArea setFile={ setFile }/>
            </div>;
    }

    function renderFileLoadBar() {
        return isUploading && <div className={ classes.FileLoadBar }>
            <FileLoadBar percent={ progress }/>
        </div>;
    }

    function renderQuestion() {
        return props.profileTask
            .task
            .questions
            .map(q =>
                <QuestionComponent
                    key={ q.id }
                    profileTaskId={ props.profileTask.id }
                    question={ q } answers={ answers }
                    setAnswers={ setAnswers }
                />
            );
    }

    function renderButton() {
        return <div
            className={ classes.SaveButton }>
            <Button
                borderSide={ true }
                disabled={ disableSaveButton }
                value={ 'save' }
                onClick={ () => save() }
            />
        </div>;
    }

    return (
        <div className={ classes.ProfileTaskModal }>
            <div className={ classes.ModalWrap }>
                { renderTaskTitle() }
                { renderTaskDescription() }
                { renderFileLoadBar() }
                { renderDropArea() }
                { renderThingEditor() }
                { renderQuestion() }
            </div>
            { renderButton() }
        </div>
    );
}

export default ProfileTaskModal;