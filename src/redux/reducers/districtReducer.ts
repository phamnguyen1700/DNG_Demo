import { createSlice } from "@reduxjs/toolkit";
import IDistrict from "../..//typing/districtType";
import { fetchDistrictAction } from "../actions/districtAction";



interface DistrictState {
    status: number,
    message: string,
    data: IDistrict[]
}

const initialState: DistrictState = {
    status: -1,
    message: '',
    data: []
}

const districtSlice = createSlice({
    name: 'district',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDistrictAction.pending, (state) => {
                state.status = -1;
            })
            .addCase(fetchDistrictAction.fulfilled, (state, action) => {
                state.status = 1;
                state.data = action.payload;
            })
            .addCase(fetchDistrictAction.rejected, (state, action) => {
                state.status = 0;
                state.message = (action.payload as { message: string }).message;
            })
    }    
})

export default districtSlice.reducer;