import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWardsService } from "../../services/wardService";
import IWard from "../../typing/wardType";




export const fetchWardAction = createAsyncThunk<IWard[], number>(
    "ward/fetchWard",
    async (
        district_id: number
    ) => {
        const res = await getWardsService(district_id);
        const { data, status } = res;
        if (status === 1) {
            return data;
        }
        return [];
    }
)