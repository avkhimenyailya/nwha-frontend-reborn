import { Answer } from './Answer';

export interface ProfileTask {
    id: number;
    taskId: number;
    thingId?: number;
    answers: Answer[];
}