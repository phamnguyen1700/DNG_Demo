import { createSlice } from "@reduxjs/toolkit";
import { IProvince } from "../../typing/provinceType";
import { fetchProvinceAction } from "../actions/provinceAction";

interface ProvinceState {
    provinceList: IProvince[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const initialState: ProvinceState = {
    provinceList: [],
    status: 'idle',
    error: undefined
}

const provinceSlice = createSlice({
    name: 'province',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProvinceAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProvinceAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.provinceList = action.payload;
            })
            .addCase(fetchProvinceAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message;
            })
    }    
})

export default provinceSlice.reducer;
