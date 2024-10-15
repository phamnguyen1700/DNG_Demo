import { createSlice } from '@reduxjs/toolkit'
import { IStudentState, IStudent } from '../../typing/studentType'
import { fetchStudentListAction, fetchStudentDetailAction, saveStudentAction } from '../actions/studentAction'

const initialState : IStudentState = {
    studentDetail: undefined, // Đảm bảo rằng student có thể undefined
    studentList: [],
    filteredStudentList: [],
    total: 0,
    status: 'idle',
    error: undefined,
}


const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentListAction.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchStudentListAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.studentList = action.payload.list;
                state.filteredStudentList = action.payload.list;
                state.total = action.payload.total;
            })
            .addCase(fetchStudentListAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message || 'Thất Bại';
            })
            .addCase(fetchStudentDetailAction.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchStudentDetailAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.studentDetail = action.payload;
            })
            .addCase(fetchStudentDetailAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message || 'Thất Bại';
            })
            .addCase(saveStudentAction.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(saveStudentAction.fulfilled, (state) => {
                state.status = 'succeeded';
              })
            .addCase(saveStudentAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as { message: string }).message || 'Thất Bại';
              });
    }
})

export default studentSlice.reducer