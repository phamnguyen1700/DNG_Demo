import React from 'react'
import { Root } from 'react-dom/client';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';

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