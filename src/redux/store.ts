import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducers';
// import menuReducer from './reducers/menuReducer';
import programReducer from './reducers/programReducer';
import courseReducer from './reducers/courseReducer';
import storeReducer from './reducers/storeReducer';
import studentReducer from './reducers/studentReducers';
import provinceReducer from './reducers/provinceReducer';
import uploadFileReducer from './reducers/uploadFileReducer';
import districtReducer from './reducers/districtReducer';
import wardReducer from './reducers/wardReducers';
const store = configureStore({
    reducer: {
        auth: authReducer, // Xác thực
        // menu: menuReducer, // Menu
        program: programReducer, // Chương trình đào tạo
        course: courseReducer, // Khóa học
        store: storeReducer, // Chi nhánh
        student: studentReducer, //
        province: provinceReducer, // Tỉnh thành
        uploadFile: uploadFileReducer, // Upload file
        district: districtReducer, //
        ward: wardReducer, //
    },
    devTools: process.env.NODE_ENV !== 'production', // Chỉ bật DevTools khi không phải production
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
