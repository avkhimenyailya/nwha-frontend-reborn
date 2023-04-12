import { createSlice } from '@reduxjs/toolkit';

export const cellModalSlice = createSlice({
    name: 'cellModal',
    initialState: {
        visibleCellModal: false
    },
    reducers: {
        setVisibleCellModal: (state, action) => {
            state.visibleCellModal = action.payload;
        }
    }
});

export const { setVisibleCellModal } = cellModalSlice.actions;