import { ProfileTask } from './ProfileTask';
import { ProfilePairTraits } from './ProfileTraits';

export interface Profile {
    id: number;
    username: string;
    description?: string;
    profileTasks: ProfileTask[];
    profilePairsTraits: ProfilePairTraits[];
}