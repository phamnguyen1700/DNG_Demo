import axios from "axios";
import { ILogin } from "../typing";


export const loginService = async (payload: ILogin) => {
  const res = await axios.post("https://api-dev.seoulacademy.edu.vn/api/login", {
    username: payload.username,
    password: payload.password,
    rememberPassword: payload.rememberPassword,
  });
  return res.data;
}


