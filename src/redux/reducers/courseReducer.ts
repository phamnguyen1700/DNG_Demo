// src/redux/reducers/courseSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCourseList, saveCourseAction, toggleCourseStatus } from '../actions/courseAction';
import { CourseState, ICourse } from '../../typing/courseType';

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
                console.log('DANH SÁCH COURSE REDUCER', action.payload);
                state.status = 'succeeded';
                state.courseList = action.payload.list;
                state.filteredCourseList = action.payload.list; // Khởi tạo danh sách lọc giống danh sách gốc
                state.total = action.payload.total;
            })
            .addCase(fetchCourseList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message;
            })
            //case xử lý taoj mới và cập nhật
            .addCase(saveCourseAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveCourseAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(saveCourseAction.rejected, (state, action) => {
                console.log('Error in saveCourseAction:', action.payload);
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message;
            })
            .addCase(toggleCourseStatus.fulfilled, (state, action) => {
                console.log('CAU TRUC DU LIEU TRA VE', action.payload);
                const course = state.courseList.find((course) => course.id === action.payload.id);
                if (course) {
                  course.active = action.payload.status; // Cập nhật trạng thái mới
                }
                state.status = 'succeeded'; // Đánh dấu là đã hoàn thành
            });
    },
});

export default courseSlice.reducer;
