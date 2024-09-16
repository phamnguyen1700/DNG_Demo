import axiosInstance from "../../src/common/utils/axiosConfig";

export const fetchMenuListService = async () => {
    try {
        // Sử dụng axiosInstance đã được cấu hình với Interceptors
        const res = await axiosInstance.get("/menu/list");

        const menuList = res.data.data; // Chỉ lấy mảng 'data' từ API
        console.log("API Response:", menuList); // Log để kiểm tra API trả về

        localStorage.setItem("menuList", JSON.stringify(menuList)); // Lưu vào localStorage
        return menuList;  
    } catch (error) {
        console.log("Lỗi fetch menu list:", error);
        return []; // Trả về mảng trống trong trường hợp lỗi
    }
};
