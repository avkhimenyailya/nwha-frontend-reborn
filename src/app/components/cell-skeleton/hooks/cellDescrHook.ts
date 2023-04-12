import { useEffect, useState } from 'react';
import { ProfileTask } from '../../../models/ProfileTask';

export function useDescription(profileTask: ProfileTask) {
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(profileTask.task.description.split('(')?.[0]);
    }, [profileTask]);

    return (
        description
    );
}