// src/redux/reducers/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCourseList, toggleCourseStatus } from '../actions/courseAction';
import { CourseState, Course } from '../../typing/courseType';

const initialState: CourseState = {
    courseList: [],
    filteredCourseList: [], // Thêm danh sách lọc riêng
    total: 0,
    status: 'idle',
    error: undefined,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetCourseList: (state)=>{
            state.courseList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourseList.fulfilled, (state, action) => {
                console.log('cấu trúc trả về của course', action.payload);
                state.status = 'succeeded';
                state.courseList = action.payload.list || [];
                state.filteredCourseList = action.payload.list || []; // Khởi tạo danh sách lọc giống danh sách gốc
                state.total = action.payload.total || 0;
            })
            .addCase(fetchCourseList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message;
            })
            .addCase(toggleCourseStatus.fulfilled, (state, action) => {
                const course = state.courseList.find(course => course.id.toString() === action.payload.id);
                if (course) {
                    course.active = action.payload.active;
                }
            });
    },
});

export default courseSlice.reducer;
