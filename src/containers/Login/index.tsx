import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, Typography, FormControlLabel, Switch } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../../redux/actions/auth';
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { toast } from "react-toastify";
import { paths } from '../../route/path';
// import { fetchMenuList } from '../../redux/actions/menuAction';
interface IFormInput {
    username: string;
    password: string;
    rememberPassword?: string;
}

//scheme for validation
const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(12, 'Username must be at most 12 characters'),
    password: yup.string()
        .required('Password is required')
        .min(1, 'Password must be at least 1 characters'),
    rememberPassword: yup.string().optional()
});


//dispatch xử lý login
const LoginForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();// sử dụng app dispatch vì có nhiều yều cầu cần xử lý
    const { loading, error, user: data } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate(); // Khởi tạo hook điều hướng




    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const [remember, setRemember] = useState(false);

    const onSubmit = async (data: IFormInput) => {
        data.rememberPassword = remember ? '1' : '0';
       const result = await dispatch(login(data));
       console.log("Result:", result);
       if(result.meta.requestStatus === "fulfilled"){
        navigate(paths.overview);
       }else{
        console.log('Login fail', result);
    } 
    };

    useEffect(() => {
    // Kiểm tra xem có cần hiển thị toast hay không
    if (localStorage.getItem("showLoginToast") === "true") {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      
      // Xóa thông báo sau khi đã hiển thị
      localStorage.removeItem("showLoginToast");
    }
  }, []);

    // useEffect(() => {
    //     if (data) {
    //         navigate('/home'); // Chuyển hướng đến trang Home khi đăng nhập thành công
    //     }
    // }, [data, navigate]);



    return (
        <div className='container'>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                />

                <FormControlLabel
                control={<Switch checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                label="Remember Me"
                />


                {error && <Typography color="error">{error}</Typography>}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                
            </Box>
        </div>
    );
};

export default LoginForm;
