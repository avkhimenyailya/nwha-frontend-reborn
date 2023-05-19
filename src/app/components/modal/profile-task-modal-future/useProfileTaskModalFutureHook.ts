import {useEffect, useState} from "react";
import {Thing2} from "../../../models/Thing2";
import {ProfileTask} from "../../../models/ProfileTask";
import {Answer} from "../../../models/Answer";
import {thingApi2} from "../../../store/api/thingApi2";
import {profileTaskApi} from "../../../store/api/profileTaskApi";

export function useProfileTaskModalFutureHook(profileTask: ProfileTask, setModalVisible: (flag: boolean) => void) {
    const [thingState, setThingState] = useState<Thing2>(profileTask.thing2 ?? {
        profileTaskId: profileTask.id,
        archived: false,
        removed: false
    } as Thing2);

    const [answers, setAnswers] = useState(new Map<number, Answer>());

    useEffect(() => {
        const newMap = new Map<number, Answer>();
        profileTask.answers.map(a => newMap.set(a.questionId!, a));
        setAnswers(newMap);
    }, [profileTask]);

    const [createThing] = thingApi2.useCreateThing2Mutation();
    const [updateThing] = thingApi2.useUpdateThing2Mutation();
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