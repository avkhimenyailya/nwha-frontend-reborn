import { Role } from './Role';

export interface AuthResponse {
    profileId?: number;
    accessToken?: string;
    refreshToken?: string;
    roles?: Role[];
}