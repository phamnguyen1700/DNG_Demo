// src/redux/actions/courseActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseList, saveCourseService, updateCourseStatus } from '../../services/courseService';
import { IPayloadSaveCourse } from '../../typing/courseType';

export const fetchCourseList = createAsyncThunk(
    'course/fetchCourseList',
    async (params: {
        limit: number;
        offset: number;
        store_id?: string;
        program_id?: string;
        active?: string;
        key?: string;
    }, { rejectWithValue }) => {
        try {
            const response = await getCourseList(params);
            console.log('88888888888888888888', response);
            return response;
        } catch (error: any) {
            console.error('Error in fetchCourseList:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);



// Action tạo mới hoặc cập nhật khóa học
export const saveCourseAction = createAsyncThunk(
    'course/saveCourseActtion',
    async (courseData: IPayloadSaveCourse, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await saveCourseService(courseData);
            if ( res.status === 1 ) {
                return fulfillWithValue(res.data);
            } else {
                return rejectWithValue(null);
            } 
        } catch ( error ) {
            return rejectWithValue(null);
        }
    }
);







// Action cập nhật trạng thái khóa học
export const toggleCourseStatus = createAsyncThunk(
    'course/toggleCourseStatus',
    async ({ id, active }: { id: number; active: number }, { rejectWithValue }) => {
        try {
            const response = await updateCourseStatus(id, active);
            console.log('ACTION!!!', response);
            return { id, status: response.status }; // Trả về `id` và `active` mới sau khi cập nhật
        } catch (error: any) {
            console.error('Error in toggleCourseStatus:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);