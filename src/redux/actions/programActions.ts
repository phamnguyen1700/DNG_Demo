// src/redux/actions/programActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProgramListService, saveProgramService } from '../../services/programService';
import { IPayloadSaveProgram } from '../../typing/programsType';
import { toast } from 'react-toastify';
//lấy danh sách chương trình
export const fetchProgramListAction = createAsyncThunk(
    'program/fetchProgramList',
    async (params: {
        limit: number;
        offset: number;
        store_id?: number;
        active?: number;
        key?: string;
    }, { fulfillWithValue, rejectWithValue }) => {
            const response = await getProgramListService(params);
            if (response.data && response.data.list) {
                return fulfillWithValue(response.data);
            } else {
                // Xử lý khi danh sách trả về là null hoặc không hợp lệ
                return rejectWithValue('Danh sách trả về null hoặc không hợp lệ.');
        }
    }
);



//tao moi chuong trinh

export const saveProgramAction = createAsyncThunk(
    'program/createOrUpdateProgram',
    async (programData: IPayloadSaveProgram, { 
        rejectWithValue,
        fulfillWithValue }) => {
        try {
            const res = await saveProgramService(programData);
            if(res.status === 1) {
                toast.success('Thành công');
                return fulfillWithValue(res.data);
            }else{
                return rejectWithValue('Thất bại');
            }
        } catch (error) {
            toast.error('Thất bại');
            return rejectWithValue(null)
        }
    }
);


