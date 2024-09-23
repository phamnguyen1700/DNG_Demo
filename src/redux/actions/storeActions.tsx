import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStoresService } from '../../services/storeService'; // Import hàm getStores để gọi API
import { IStore } from '../../typing/storeType'; // Interface IStore cho chi nhánh

// Tạo action để lấy danh sách các chi nhánh từ API
export const fetchStoreAction = createAsyncThunk<IStore[], void>(
  'store/fetchStore',
  async () => {
    const data: IStore[] = await getStoresService(); // Gọi API để lấy danh sách chi nhánh
    return data; // Trả về mảng các chi nhánh
  }
);
