// src/redux/reducers/fileUploadReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { uploadFileAction } from "../actions/studentAction";

interface IFileUploadState {
  url: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IFileUploadState = {
  url: null,
  loading: false,
  error: null,
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileAction.fulfilled, (state, action) => {
        console.log("URL:", action.payload);
        state.loading = false;
        state.url = action.payload; // Lưu URL
      })
      .addCase(uploadFileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fileUploadSlice.reducer;
