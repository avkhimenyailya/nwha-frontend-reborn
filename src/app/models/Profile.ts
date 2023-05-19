import { ProfileAttribute } from './ProfileAttribute';

export interface Profile {
    id: number;
    username: string;
    description?: string;
    personalLink?: string;
    profileAttributes: ProfileAttribute[];
}