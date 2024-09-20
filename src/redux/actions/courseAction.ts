// src/redux/actions/courseActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseList, updateCourseStatus } from '../../services/courseService';

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
            return response.data;
        } catch (error: any) {
            console.error('Error in fetchCourseList:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);

// Action cập nhật trạng thái khóa học
export const toggleCourseStatus = createAsyncThunk(
    'course/toggleCourseStatus',
    async ({ id, active }: { id: string; active: string }, { rejectWithValue }) => {
        try {
            const response = await updateCourseStatus(id, active);
            return { id, active: response.active }; // Trả về `id` và `active` mới sau khi cập nhật
        } catch (error: any) {
            console.error('Error in toggleCourseStatus:', error);
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);