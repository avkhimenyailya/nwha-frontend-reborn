import React from "react";
import ModalSkeleton from "../modal-skeleton/ModalSkeleton";
import {ProfileTask} from "../../../models/ProfileTask";
import Button from "../../primitives/buttons/button /Button";
import {useProfileTaskModalFutureHook} from "./useProfileTaskModalFutureHook";
import classes from "./ProfileTaskModalFuture.module.css";
import InfoByHover from "../../info-by-hover/InfoByHover";
import ThingEditor from "./thing-editor/ThingEditor";
import DropArea from "./drop-area/DropArea";
import QuestionComponent from "../../question/QuestionComponent";

interface ProfileTaskModalFutureProps {
    profileTask: ProfileTask;
    setModalVisible: (flag: boolean) => void;
}

function ProfileTaskModalFuture(props: ProfileTaskModalFutureProps) {
    const {
        answers, setAnswers,
        thingState, setThingState,
        save
    } = useProfileTaskModalFutureHook(props.profileTask, props.setModalVisible);

    function renderTaskTitle() {
        return <div className={classes.ProfileTaskModalHeader}>
            <p className={classes.TaskOrdinalNumber}>
                {'Task ' + props.profileTask.task.ordinalNumber}</p>
            {props.profileTask.task.details && <InfoByHover value={props.profileTask.task.details}/>}</div>;
    }

    function renderTaskDescription() {
        return <p className={classes.TaskDescription}>
            {props.profileTask.task.description.replaceAll('%%%', ' ')}</p>;
    }

    function renderThingZone() {
        return <div className={classes.ThingZone}>
            {thingState.pictureLink
                ? <ThingEditor thingState={thingState} setThingState={setThingState}/>
                : <DropArea thingState={thingState} setThingState={setThingState}/>}
        </div>
    }

    function renderQuestion() {
        return props.profileTask
            .task
            .questions
            .map(q =>
                <QuestionComponent
                    key={q.id}
                    question={q}
                    answers={answers}
                    setAnswers={setAnswers}
                    profileTaskId={props.profileTask.id}
                />
            );
    }

    return (
        <ModalSkeleton
            setModalVisible={props.setModalVisible}
            buttons={[<Button onClick={() => save()} value={'save'}/>]}>
            {renderTaskTitle()}
            {renderTaskDescription()}
            {renderThingZone()}
            {renderQuestion()}
        </ModalSkeleton>
    );
}

export default ProfileTaskModalFuture;