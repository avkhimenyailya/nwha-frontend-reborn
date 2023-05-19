import {Answer} from './Answer';
import {Task} from './Task';
import {Thing} from './Thing';
import {Thing2} from "./Thing2";

export interface ProfileTask {
    id: number;
    profileId: number;
    task: Task;
    thing?: Thing;
    thing2?: Thing2;
    answers: Answer[];
}