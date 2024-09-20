import React from 'react'
import { IProgramState } from '../../typing/programsType'
import { createSlice } from '@reduxjs/toolkit'
import { fetchProgramList, saveProgramAction } from '../actions/programActions'

const initialState: IProgramState = {
  programList: [],
  filteredProgramList: [],
  total: 0,
  status: 'idle',
  error: undefined,
}

const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: 
    {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProgramList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.programList = Array.isArray(action.payload.list) ? action.payload.list : [];
        state.filteredProgramList = action.payload.list || [];
        state.total = action.payload.total || 0;
    })
      .addCase(fetchProgramList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as { message: string }).message
      })
      // Case xử lý tạo mới hoặc cập nhật chương trình
      .addCase(saveProgramAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveProgramAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // const existingProgramIndex = state.programList.findIndex(
        //   (program) => program.id.toString() === action.payload.id
        // );

        // if (existingProgramIndex !== -1) {
        //   // Nếu tìm thấy chương trình với id, cập nhật chương trình
        //   state.programList[existingProgramIndex] = action.payload;
        // } else {
        //   // Nếu không tìm thấy, thêm chương trình mới
        //   state.programList.push(action.payload);
        //   state.total += 1;
        // }
        
        // // Cập nhật filteredProgramList sau khi thêm hoặc cập nhật
        // state.filteredProgramList = [...state.programList];
      })
      .addCase(saveProgramAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as { message: string }).message;
      });
    },
});

export default programSlice.reducer