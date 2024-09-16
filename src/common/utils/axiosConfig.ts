import axios from "axios";

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
      const token = localStorage.getItem("authToken");
      
    
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

  export default axiosInstance;