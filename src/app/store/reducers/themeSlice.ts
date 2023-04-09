import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme:
            localStorage.getItem('nwha-theme')
                ? localStorage.getItem('nwha-theme')
                : 'light'
    },
    reducers: {
        toggleTheme: (state) => {
            switch (state.theme) {
                case 'light':
                    state.theme = 'dark';
                    localStorage.setItem('nwha-theme', state.theme);
                    break;
                case 'dark':
                    state.theme = 'light';
                    localStorage.setItem('nwha-theme', state.theme);
                    break;
            }
        }
    }
});

export const { toggleTheme } = themeSlice.actions;