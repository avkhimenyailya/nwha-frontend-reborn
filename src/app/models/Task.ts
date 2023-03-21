import { Question } from './Question';

export interface Task {
    id: number;
    ordinalNumber: number;
    description: string;
    questions: Question[];
}