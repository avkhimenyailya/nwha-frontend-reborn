import { Option } from './Option';

export interface Question {
    id: number;
    ordinalNumber: number;
    options: Option[];
}