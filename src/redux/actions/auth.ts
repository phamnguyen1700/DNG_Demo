import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../../services/auth";
import { ILogin } from "../../typing";
import { logout } from "../reducers/authReducers";
import { USER_KEY } from "../../constants/app";

//XỬ LÝ ĐĂNG NHẬP VỚI DỮ LIỆU TỪ API

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILogin, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {

      const response = await services.loginService(payload);
      
      console.log("Response:", response);
      if(response.status === 1){
        return fulfillWithValue(response.data);
      }
      if(response.status === 403){
        dispatch(logout());
      }
      return rejectWithValue(null);
    } catch (error: any) {
      return rejectWithValue(null);
    }
  } 
)

/*export const syncAuthState = createAsyncThunk(
  "auth/syncState",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      const user = JSON.parse(userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }
);*/

export const syncAuthState = createAsyncThunk(
  "auth/syncState",
  async (_, { dispatch, rejectWithValue }) => {
    const userData = localStorage.getItem(USER_KEY);

 
  }
);

