import {useEffect, useState} from "react";
import {Thing} from "../../../models/Thing";
import {ProfileTask} from "../../../models/ProfileTask";
import {Answer} from "../../../models/Answer";
import {thingApi} from "../../../store/api/thingApi";
import {profileTaskApi} from "../../../store/api/profileTaskApi";

export function useProfileTaskModalFutureHook(profileTask: ProfileTask, setModalVisible: (flag: boolean) => void) {
    const [thingState, setThingState] = useState<Thing>(profileTask.thing ?? {
        profileTaskId: profileTask.id,
        archived: false,
        removed: false
    } as Thing);

    const [answers, setAnswers] = useState(new Map<number, Answer>());

    useEffect(() => {
        const newMap = new Map<number, Answer>();
        profileTask.answers.map(a => newMap.set(a.questionId!, a));
        setAnswers(newMap);
    }, [profileTask]);

    const [createThing] = thingApi.useCreateThingMutation();
    const [updateThing] = thingApi.useUpdateThingMutation();
    const [updateAnswers] = profileTaskApi.useUpdateAnswersByProfileTaskIdMutation();

    function save() {
        if (thingState.id) {
            updateThing(thingState);
        } else {
            createThing(thingState);
        }
        updateAnswers({
            profileTaskId: profileTask.id,
            answers: Array.from(answers.values())
        });
        setThingState({
            profileTaskId: profileTask.id,
            archived: false,
            removed: false
        })
        setModalVisible(false);
    }

    return {
        thingState,
        setThingState,
        answers,
        setAnswers,
        save
    }
}