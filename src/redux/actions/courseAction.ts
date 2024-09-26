// src/redux/actions/courseActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseListService , saveCourseService, updateCourseStatus } from '../../services/courseService';
import { IPayloadSaveCourse } from '../../typing/courseType';
import { toast } from 'react-toastify';
export const fetchCourseListAction = createAsyncThunk(
    'course/fetchCourseListAction',
    async (params: {
        limit: number;
        offset: number;
        store_id?: number;
        program_id?: number;
        active?: string;
        key?: string;
    }, { rejectWithValue }) => {
        try {
            const response = await getCourseListService(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || 'An unexpected error occurred'
            );
        }
    }
);



// Action tạo mới hoặc cập nhật khóa học
export const saveCourseAction = createAsyncThunk(
    'course/saveCourseActtion',
    async (courseData: IPayloadSaveCourse, { 
        rejectWithValue, 
        fulfillWithValue 
    }) => {
        try {
            const res = await saveCourseService(courseData);
            if ( res.status === 1 ) {
                toast.success('Thành công');
                return fulfillWithValue(res.data);
            } else {
                return rejectWithValue(null);
            } 
        } catch ( error ) {
            toast.error('Thất bại');
            return rejectWithValue(null);
        }
    }
);


export const toggleCourseStatus = createAsyncThunk(
    'course/toggleCourseStatus',
    async ({ id, active }: { id: number; active: number }, 
        {   rejectWithValue,
            fulfillWithValue 
        }) => {
                try {
                    const res = await updateCourseStatus(id, active);
                    if (res.status === 1) {
                        toast.success('Trạng thái khóa học đã được cập nhật');
                        return fulfillWithValue({ id, active: res.status });
                    } else {
                        return rejectWithValue(null);
                    }
                } catch (error: any) {
                        toast.error('Có lỗi xảy ra trong khi thay đổi trạng thái khóa học');
                return rejectWithValue(null);
            };
        }   
)
