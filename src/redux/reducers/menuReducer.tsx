import { createSlice } from '@reduxjs/toolkit';
import { fetchMenuList } from '../actions/menuAction';


interface MenuState {
    menuList: any[] | null;
    menuLoading: boolean;
    menuError: string | null;
}

const initialState: MenuState = {
    menuList: [],
    menuLoading: false,
    menuError: null,
};


const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // Các action khác nếu cần thêm
        clearMenuList: (state) => {
            state.menuList = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //menuLoading = true
            .addCase(fetchMenuList.pending, (state) => {
                console.log('Fetching menu list...');
                state.menuLoading = true;
                state.menuError = null; //xoa loi trc do
            })
            //dang nhap that bai
            .addCase(fetchMenuList.rejected, (state, action: any) => {
                console.log('Menu list fetch failed:',action.payload);
                state.menuLoading = false;
                state.menuError = action.payload || 'Lấy menu list thất bại';
            })
            //dang nhap thanh cong
            .addCase(fetchMenuList.fulfilled, (state, action: any) => {
                console.log('Menu list fetched:',action.payload);
                state.menuLoading = false;
                state.menuList = action.payload;
            });
    }
});
export default menuSlice.reducer;