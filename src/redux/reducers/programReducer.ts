import React from 'react'
import { IProgramState } from '../../typing/programsType'
import { createSlice } from '@reduxjs/toolkit'
import { fetchProgramListAction, saveProgramAction } from '../actions/programActions'

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
      .addCase(fetchProgramListAction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProgramListAction.fulfilled, (state, action) => {
        console.log('DANH SÁCH PROGRAM REDUCER', action.payload);
        state.status = 'succeeded';
        state.programList = action.payload.list;
        state.filteredProgramList = action.payload.list;
        state.total = action.payload.total;
    })
      .addCase(fetchProgramListAction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as { message: string }).message
      })
      // Case xử lý tạo mới hoặc cập nhật chương trình
      .addCase(saveProgramAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveProgramAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(saveProgramAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as { message: string }).message;
      });
    },
});

export default programSlice.reducer