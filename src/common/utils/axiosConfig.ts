import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../../constants/app";

//tạo ĩnstance axios
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
        window.location.href = "/login";
      }
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

  export default axiosInstance;