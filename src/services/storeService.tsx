// services/storeService.ts
import axiosInstance from '../common/utils/axiosConfig'; // Import axiosInstance đã cấu hình
import { IStoreListResponse } from '../typing/storeType';

// Hàm service để gọi API lấy danh sách chi nhánh (store)
export const getStores = async (): Promise<IStoreListResponse> => {
    const response = await axiosInstance.get<IStoreListResponse>('/store/list'); // Đảm bảo đường dẫn chính xác
    return response.data;
};
