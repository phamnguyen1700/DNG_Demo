import React from 'react'
import { Root } from 'react-dom/client';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { syncAuthState } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';

interface CheckLoginProps {
    navigation: boolean;
    navigationPath: string;
}

const loginAuth = (
    WrappedComponent: React.ComponentType,
    { navigation, navigationPath }: CheckLoginProps
) => {
    const AuthWrapper = (props: any) => {
        const { user: data } = useSelector((state: RootState) => state.auth);
        const dispatch: AppDispatch = useDispatch(); // Khởi tạo dispatch
        const token = localStorage.getItem('authToken');

        if (!data && token) {
            dispatch(syncAuthState());
        }

        //DIEU HUONG
        if (navigation && data) {
            //CO TOKEN
            return <Navigate to={navigationPath}/>
        }

        if (!navigation && !data) {
            //KHONG CO TOKEN
            return <Navigate to={navigationPath} />
        }
        //NEU KHONG DIEU HUONG
        return <WrappedComponent {...props} />
    };
    return AuthWrapper;
  
}

export default loginAuth;