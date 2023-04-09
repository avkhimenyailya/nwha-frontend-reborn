import { Answer } from './Answer';
import { Task } from './Task';
import { Thing } from './Thing';

export interface ProfileTask {
    id: number;
    task: Task;
    thing?: Thing;
    answers: Answer[];
}