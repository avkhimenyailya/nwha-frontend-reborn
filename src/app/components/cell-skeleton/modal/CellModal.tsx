import React, { useEffect, useState } from 'react';
import classes from './CellModal.module.css';
import Modal from '../../modal/Modal';
import { ProfileTask } from '../../../models/ProfileTask';
import QuestionComponent from '../../question/QuestionComponent';
import { Answer } from '../../../models/Answer';
import DropArea from './drop-area/DropArea';
import ThingEditor from './thing-editor/ThingEditor';
import { Thing } from '../../../models/Thing';

interface CellModalProps {
    isPerson: boolean;
    profileTask: ProfileTask;
    setModalVisible: (flag: boolean) => void;

    answers: Map<number, Answer>;

    thing: Thing | null;
    setThing: (thing: Thing | null) => void;

    file: File | null;
    setFile: (file: File | null) => void;

    thingDescr?: string;
    setThingDescr: (descr: string) => void;
}

function CellModal(props: CellModalProps) {
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (props.answers.size > 0 && props.file) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [props.answers.size, props.file]);

    function renderThingEditor() {
        return (props.file || (props.thing && !props.thing.archived && !props.thing.removed))
            && <div className={ classes.ThingEditor }>
                <ThingEditor
                    thing={ props.thing }
                    setThing={ props.setThing }
                    file={ props.file }
                    setFile={ props.setFile }
                    thingDescr={ props.thingDescr }
                    setThingDescr={ props.setThingDescr }
                />
            </div>;
    }

    function renderDropArea() {
        return (!props.file && (!props.thing || props.thing.archived || props.thing.removed))
            && <div className={ classes.DropArea }>
                <DropArea setFile={ props.setFile }/>
            </div>;
    }

    function renderQuestions() {
        return props.profileTask.task.questions.map(question =>
            <QuestionComponent
                answers={ props.answers }
                key={ question.id }
                question={ question }
                setAnswer={ setAnswer }
                profileTaskId={ props.profileTask.id }
            />
        );
    }

    function setAnswer(answer: Answer) {
        props.answers.set(answer.questionId!, answer);
        if (props.answers.size > 0 && props.file) {
            setDisableButton(false);
        }
    }

    return (
        <Modal
            disableButton={ disableButton }
            setModalVisible={ props.setModalVisible }>
            <div className={ classes.CellModal }>
                <p className={ classes.TaskOrdinalNumber }>
                    { 'Task ' + props.profileTask.task.ordinalNumber }
                </p>
                <p className={ classes.TaskDescription }>
                    { props.profileTask.task.description }
                </p>
                { props.profileTask.task.details &&
                    <p className={ classes.TaskDetails }>
                        { props.profileTask.task.details }
                    </p>
                }
                { renderThingEditor() }
                { renderDropArea() }
                { renderQuestions() }
            </div>
        </Modal>
    );
}

export default CellModal;