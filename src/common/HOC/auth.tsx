import React from 'react'
import { Root } from 'react-dom/client';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { syncAuthState } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { getUserLocalStore, isAuth } from '../actions/stores';
import { paths } from '../../route/path';

interface IAuthProps {
    WrappedComponent: React.FC;
}

const Auth = (authProps:IAuthProps) =>{
    const { WrappedComponent } = authProps;
    const AuthWrapper = (props: any) => {
        if(!isAuth()){
            return <Navigate to={paths.auth.login}/>
        }
        //NEU KHONG DIEU HUONG
        return <WrappedComponent {...props} />
    };
    return AuthWrapper
}

export default Auth;