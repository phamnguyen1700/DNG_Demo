import { fetchMenuListService } from "../../services/menuList";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenuList = createAsyncThunk(
    'menu/fetchMenuList',
    async (_, { rejectWithValue }) => {
        try {
            // Kiểm tra nếu menu đã tồn tại trong localStorage
            const localMenuList = localStorage.getItem('menuList');
            if (localMenuList) {
                return JSON.parse(localMenuList); // Trả về từ localStorage nếu tồn tại
            }

            // Gọi API nếu chưa có trong localStorage
            const menuList = await fetchMenuListService();
            localStorage.setItem('menuList', JSON.stringify(menuList));
            console.log('Menu list fetched:', menuList);
            return menuList;

        } catch (error) {
            return rejectWithValue("KHÔNG THỂ LẤY MENU LIST");
        }
    }
);
