import { createSlice } from "@reduxjs/toolkit";
import IWard from "../../typing/wardType";
import { fetchWardAction } from "../actions/wardAction";


interface WardState {
    status: number,
    message: string,
    data: IWard[]
}

const initialState: WardState = {
    status: -1,
    message: '',
    data: []
}

const wardSlice = createSlice({
    name: 'ward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWardAction.pending, (state) => {
                state.status = -1;
            })
            .addCase(fetchWardAction.fulfilled, (state, action) => {
                state.status = 1;
                state.data = action.payload;
            })
            .addCase(fetchWardAction.rejected, (state, action) => {
                state.status = 0;
                state.message = (action.payload as { message: string }).message;
            })
    }    
})

export default wardSlice.reducer;