// services/storeService.ts
import axiosInstance from "../common/utils/axiosConfig"; // Import axiosInstance đã cấu hình

// Hàm service để gọi API lấy danh sách chi nhánh (store)
export const getStoresService = async () =>
  await axiosInstance.get("/store/list"); // Đảm bảo đường dẫn chính xác
