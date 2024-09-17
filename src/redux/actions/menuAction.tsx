import { fetchMenuListService } from "../../services/menuList";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenuList = createAsyncThunk(
    'menu/fetchMenuList',
    async (_, { rejectWithValue }) => {
        try {
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
