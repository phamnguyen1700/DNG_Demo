import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStores } from "../../services/storeService";

export const fetchStore = createAsyncThunk(
    'store/fetchStore',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getStores();
            return response.data;
        } catch (error: any) {
            console.error('Error in fetchStore:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
)