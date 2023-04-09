import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthRequest } from '../../models/auth/request/AuthRequest';
import { AuthResponse } from '../../models/auth/AuthResponse';
import axios from 'axios';

export const baseUrl: string = 'https://api.nwha.grayproject.io';
export const getAccessToken = createAsyncThunk<AuthResponse, AuthRequest>('strongAuth/getAccessToken',
    async (request, { rejectWithValue }) => {
        return axios.post(`${ baseUrl }/auth/${ request.endpoint }`, request.data,
            { headers: { 'Content-Type': 'application/json' } })
            .then(r => {
                return r.data as AuthResponse;
            })
            .catch(err => {
                return rejectWithValue(err.response.data);
            });
    });

export interface StrongAuthState {
    data?: {
        username?: string,
        accessToken?: string,
        refreshToken?: string
    },
    status?: string,
    errorMessage?: string
}

const initialState: StrongAuthState = {
    data: {
        username: localStorage.getItem('nwha-usr') || undefined,
        accessToken: localStorage.getItem('nwha-access-token') || undefined,
        refreshToken: localStorage.getItem('nwha-refresh-token') || undefined
    }
};

export const authSlice = createSlice({
    name: 'strongAuth',
    initialState,
    reducers: {
        refresh: (state, action: PayloadAction<AuthResponse>) => {
            console.log(action);
            console.log(action.payload.accessToken);
            console.log(action.payload.refreshToken);
            state.data = {
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            };
            localStorage.setItem('nwha-access-token', String(action.payload.accessToken));
            localStorage.setItem('nwha-refresh-token', String(action.payload.refreshToken));
        },
        logout: (state) => {
            state.data = undefined;
            localStorage.removeItem('nwha-usr');
            localStorage.removeItem('nwha-access-token');
            localStorage.removeItem('nwha-refresh-token');
        }
    },
    extraReducers: builder => {
        builder.addCase(getAccessToken.pending, (state) => {
            state.status = 'loading';
            state.errorMessage = '';
        });
        builder.addCase(getAccessToken.fulfilled, (state, action) => {
            state.status = 'successfully';
            state.errorMessage = '';
            state.data = {
                username: action.payload.username,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            };
            localStorage.setItem('nwha-usr', String(action.payload.username));
            localStorage.setItem('nwha-access-token', String(action.payload.accessToken));
            localStorage.setItem('nwha-refresh-token', String(action.payload.refreshToken));
        });
        builder.addCase(getAccessToken.rejected, (state, action) => {
            state.status = 'error';
            state.errorMessage = Object(action.payload).message;
            localStorage.removeItem('nwha-usr');
            localStorage.removeItem('nwha-access-token');
            localStorage.removeItem('nwha-refresh-token');
        });
    }
});

export const { refresh, logout } = authSlice.actions;