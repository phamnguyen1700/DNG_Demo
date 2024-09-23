import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../../typing/storeType';
import { fetchStoreAction } from '../actions/storeActions';

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
        .addCase(fetchStoreAction.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchStoreAction.fulfilled, (state, action) => {
            console.log('DANH SÁCH CÁC CHI NHÁNH REDUCER', action.payload);
            state.status = 'succeeded';
            state.stores = action.payload;
        })
        .addCase(fetchStoreAction.rejected, (state, action) => {
            state.status = 'failed';
            state.error = (action.payload as { message: string }).message;
        })
    }
})

export default storeSlice.reducer;