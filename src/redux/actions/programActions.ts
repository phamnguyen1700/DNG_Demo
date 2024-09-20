// src/redux/actions/programActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProgramList, saveProgramService } from '../../services/programService';
import { IPayloadSaveProgram } from '../../typing/programsType';

//lấy danh sách chương trình
export const fetchProgramList = createAsyncThunk(
    'program/fetchProgramList',
    async (params: {
        limit: number;
        offset: number;
        store_id?: string;
        active?: string;
        key?: string;
    }, { rejectWithValue }) => {
        try {
            const response = await getProgramList(params);
            return response.data;
        } catch (error: any) {
            console.error('Error in fetchProgramList:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);



//tao moi chuong trinh

export const saveProgramAction = createAsyncThunk(
    'program/createOrUpdateProgram',
    async (programData: IPayloadSaveProgram, { rejectWithValue,fulfillWithValue }) => {
        try {
            const res = await saveProgramService(programData);
            if(res.status === 1) {
                return fulfillWithValue(res.data);
            }else{
                return rejectWithValue(null)
            }
        } catch (error) {
            return rejectWithValue(null)
        }
    }
);


