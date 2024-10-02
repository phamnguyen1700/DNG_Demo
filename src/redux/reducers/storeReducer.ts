import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "../../typing/storeType";
import { fetchStoreAction } from "../actions/storeActions";

interface StoreState {
  stores: IStore[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  storeSelected: IStore | null;
}

const initialState: StoreState = {
  stores: [],
  status: "idle",
  error: undefined,
  storeSelected: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreDefault: (state, action) => {
      state.storeSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreAction.fulfilled, (state, action) => {
        console.log("DANH SÁCH CÁC CHI NHÁNH REDUCER", action.payload);
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStoreAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as { message: string }).message;
      });
  },
});
export const { setStoreDefault } = storeSlice.actions;
export default storeSlice.reducer;
