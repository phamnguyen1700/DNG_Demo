import React from 'react'
import { Navigate } from 'react-router-dom';
import { isAuth } from '../actions/stores';
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