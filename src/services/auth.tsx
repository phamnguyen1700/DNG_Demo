import axiosInstance from "../common/utils/axiosConfig";
import { ILogin } from "../typing";


export const loginService = async (payload: ILogin) => {
  const res = await axiosInstance.post("/login", {
    username: payload.username,
    password: payload.password,
    rememberPassword: payload.rememberPassword,
  });
  return res;
}


