import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './api';
import { themeSlice } from './reducers/themeSlice';
import { authSlice } from './reducers/authSlice';

const preloadedState = {};

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,

    themeSlice: themeSlice.reducer,
    authSlice: authSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(api.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;