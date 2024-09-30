import axios from "axios";
import { ACCESS_TOKEN_KEY, USER_KEY } from "../../constants/app";
const axiosInstance = axios.create({
  baseURL: "https://api-dev.seoulacademy.edu.vn/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//thêm interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        config.headers["token"] = token;
      }
      return config;
    },  
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.clear();
        window.location.href = "/auth/login";
        localStorage.setItem("showLoginToast", "true");
      }
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      const data = response.data;
      console.log("Data:", data);
      if (data.status === 403 || data.status === 401) {
          localStorage.clear();
          window.location.href = "/auth/login";
          localStorage.setItem("showLoginToast", "true");
      }
      if (localStorage.getItem(ACCESS_TOKEN_KEY) === undefined) {
          localStorage.clear();
          window.location.href = "/auth/login";
      }
        return data;
}, function (error) {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    localStorage.clear();
    window.location.href = "/auth/login"; 
    localStorage.setItem("showLoginToast", "true");
  }
  return Promise.reject(error);
});

  export default axiosInstance;
