import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { AuthRequest } from '../../models/auth/request/AuthRequest';
import { baseURL } from '../../api/base';

export const doAuth = createAsyncThunk<AuthResponse, AuthRequest>('auth/doAuth',
    async (request, { rejectWithValue }) => {
        const response = await fetch(`${ baseURL }/auth/${ request.endpoint }`, {
            body: JSON.stringify(request.request),
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        return (await response.json()) as AuthResponse;
    });

export interface AuthState {
    data?: AuthResponse;
    errorMsg?: string;
    status?: string;
}

function initAuthFromLS(): AuthResponse | undefined {
    try {
        return JSON.parse(localStorage.getItem('nwha-data') || '') as AuthResponse;
    } catch (ignore) {
        return undefined;
    }
}

const initialState: AuthState = {
    data: initAuthFromLS()
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            // todo
        }
    },
    extraReducers: builder => {
        builder.addCase(doAuth.pending, (state, action) => {
            state.status = 'loading';
            state.errorMsg = '';
        });
        builder.addCase(doAuth.rejected, (state, action) => {
            state.status = 'error';
            state.errorMsg = action.error.message;
        });
        builder.addCase(doAuth.fulfilled, (state, action) => {
            state.status = 'successfully';
            state.data = action.payload;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;