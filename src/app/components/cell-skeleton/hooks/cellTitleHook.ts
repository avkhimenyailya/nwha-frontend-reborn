import { ProfileTask } from '../../../models/ProfileTask';
import { useEffect, useState } from 'react';

export function useTitle(profileTask: ProfileTask) {
    const [title, setTitle] = useState('');

    function addZeroToBegin(number: number): string {
        if (String(number).length < 2) {
            return '0' + number;
        } else {
            return String(number);
        }
    }

    useEffect(() => {
        const result: string = addZeroToBegin(profileTask.task.ordinalNumber);
        setTitle(profileTask.thing?.id
            ? result.concat(' – ').concat(String(profileTask.thing.id))
            : result);
    }, [profileTask.task.ordinalNumber, profileTask.thing?.id]);

    return (
        title
    );
}