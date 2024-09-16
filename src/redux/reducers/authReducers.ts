import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/auth";
import { IAuthState } from "../../typing/Auth";
import { syncAuthState } from "../actions/auth";
const initialState: IAuthState = {
  loading: false,
  user: null,
  error: null,
};
//EXTRAREDUCER
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Các action khác nếu cần thêm
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
        }
      })
      .addCase(syncAuthState.rejected, (state) => {
        state.user = null;
        state.error = "Failed to sync auth state";
      })
      //loading = true
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; //xoa loi trc do
      })
      //dang nhap that bai
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại";
        state.user = null;
      })
      //dang nhap thanh cong
      .addCase(login.fulfilled, (state, action: any) => {
        console.log("Payload:", action.payload);
        state.loading = false;
        state.user = action.payload;
        //lưu token vào local storage
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      });
  },
});

export const { logout } = authSlice.actions; // Action logout nếu cần
export default authSlice.reducer;
