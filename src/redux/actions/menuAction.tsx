
import { fetchMenuListService } from "../../services/menuList";
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchMenuList   = createAsyncThunk(
    'menu/fetchMenuList',
    async (_, { rejectWithValue }) => {
        try {
            //kiểm tra menulist trong local storage
            const localMenuList = localStorage.getItem('menuList');
            if (localMenuList) {
                return localMenuList;
            }

            const menuList = await fetchMenuListService();
            console.log('Menu list fetched:', menuList);
            return menuList;
        } catch (error: any) {
            return rejectWithValue("KHÔNG THỂ LẤY MENU LIST");
        }
    }
);
