import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProvincesService } from "../../services/provinceService"; // Import hàm getStores để gọi API
import { IProvince } from "../../typing/provinceType"; // Interface IStore cho chi nhánh

// Tạo action để lấy danh sách các chi nhánh từ API
export const fetchProvinceAction = createAsyncThunk<IProvince[], void>(
  "province/fetchProvince",
  async () => {
    const res = await getProvincesService();
    const { data, status } = res; // Gọi API để lấy danh sách chi nhánh
    if (status === 1) {
      return data;
    }
    return []; // Trả về mảng các chi nhánh
  }
);
