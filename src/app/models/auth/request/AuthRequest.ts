import { LoginRequest } from './LoginRequest';
import { RegisterRequest } from './RegisterRequest';
import { RefreshTokenRequest } from './RefreshTokenRequest';

export interface AuthRequest {
    endpoint: string;
    data: LoginRequest | RefreshTokenRequest| RegisterRequest;
}