import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStores } from '../../services/storeService'; // Import hàm getStores để gọi API
import { IStore } from '../../typing/storeType'; // Interface IStore cho chi nhánh

// Tạo action để lấy danh sách các chi nhánh từ API
export const fetchStore = createAsyncThunk<IStore[], void>(
  'store/fetchStore',
  async () => {
    const data: IStore[] = await getStores(); // Gọi API để lấy danh sách chi nhánh
    console.log('DANH SÁCH CÁC CHI NHÁNH CỦA ACTION', data);
    return data; // Trả về mảng các chi nhánh
  }
);
