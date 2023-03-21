import { Profile } from '../models/Profile';
import { Trait } from '../models/Trait';
import { Task } from '../models/Task';

export const tasks: Task[] = [
    {
        id: 1,
        ordinalNumber: 1,
        description: 'task 1',
        questions: [
            {
                id: 1, ordinalNumber: 1, options: [
                    { id: 1, description: 'answer option 1' },
                    { id: 2, description: 'answer option 2' }
                ]
            }
        ]
    }
];

export const traits: Trait[] = [
    { id: 1, name: 'Conductor' },
    { id: 2, name: 'Producer' },
    { id: 3, name: 'Altruistic' },
    { id: 4, name: 'Separate' },
    { id: 5, name: 'Extravert' },
    { id: 6, name: 'Introvert' },
    { id: 7, name: 'Order' },
    { id: 8, name: 'Disorder' },
    { id: 9, name: 'Mind' },
    { id: 10, name: 'Feeling' }
];

export const profile: Profile = {
    id: 1,
    username: 'ilya',
    description: 'A change strategy is characterised by a willingness to take risks, a need to show mastery, a need for recognition and to achieve results. Ambitious ambitions and a thirst for influence sometimes lead to revolutionary developments.',
    profileTasks: [
        { id: 1, taskId: 1, answers: [ { id: 5774, optionId: 1, profileTaskId: 1 } ] },
        { id: 2, taskId: 1, answers: [] },
        { id: 3, taskId: 1, answers: [ { id: 3245, optionId: 2, profileTaskId: 2 } ] },
        { id: 4, taskId: 1, answers: [ { id: 2342, optionId: 1, profileTaskId: 3 } ] },
        { id: 5, taskId: 1, answers: [] },
        { id: 6, taskId: 1, answers: [] }
    ],
    profilePairsTraits: [
        {
            profileTraitFirst: { id: 1, traitId: 1, value: 30 },
            profileTraitSecond: { id: 2, traitId: 2, value: 70 }
        },
        {
            profileTraitFirst: { id: 3, traitId: 3, value: 23 },
            profileTraitSecond: { id: 4, traitId: 4, value: 77 }
        },
        {
            profileTraitFirst: { id: 5, traitId: 5, value: 95 },
            profileTraitSecond: { id: 6, traitId: 6, value: 5 }
        },
        {
            profileTraitFirst: { id: 7, traitId: 7, value: 84 },
            profileTraitSecond: { id: 8, traitId: 8, value: 16 }
        },
        {
            profileTraitFirst: { id: 9, traitId: 9, value: 11 },
            profileTraitSecond: { id: 10, traitId: 10, value: 89 }
        }
    ]
};