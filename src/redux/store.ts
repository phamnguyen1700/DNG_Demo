import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducers';
import menuReducer from './reducers/menuReducer';


const store = configureStore({
    reducer: {
        auth: authReducer,//xác thực
        menu: menuReducer,//menu
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});
export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;