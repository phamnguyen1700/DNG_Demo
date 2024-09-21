import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../../typing/storeType';
import { fetchStore } from '../actions/storeActions';

interface StoreState {
    stores: IStore[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const initialState: StoreState = {
    stores: [],
    status: 'idle',
    error: undefined,
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchStore.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchStore.fulfilled, (state, action) => {
            console.log('DANH SÁCH CÁC CHI NHÁNH REDUCER', action.payload);
            state.status = 'succeeded';
            state.stores = action.payload;
        })
        .addCase(fetchStore.rejected, (state, action) => {
            state.status = 'failed';
            state.error = (action.payload as { message: string }).message;
        })
    }
})

export default storeSlice.reducer;