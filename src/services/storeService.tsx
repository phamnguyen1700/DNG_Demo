// services/storeService.ts
import axiosInstance from '../common/utils/axiosConfig'; // Import axiosInstance đã cấu hình

// Hàm service để gọi API lấy danh sách chi nhánh (store)
export const getStoresService = async () => {
    const res = await axiosInstance.get('/store/list'); // Đảm bảo đường dẫn chính xác
    return res.data; // Trả về dữ liệu từ API
    //RES.DATA LÀ MẢNG CÁC CHI
};
