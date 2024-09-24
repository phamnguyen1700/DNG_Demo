import React, { useEffect, useState } from 'react';
import { USER_KEY } from '../../constants/app';

interface IUser {
    id: number;
    phone: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    fullname: string;
    image_url: string;
    main_group_id: number;
}


const Profile: React.FC = () => {
    //state để ngậm dữ liệu user
    const [user, setUser] = useState<IUser | null>(null); 

    //lấy dữ liệu ra từ localstorage
    useEffect(() => {
        const userData = localStorage.getItem(USER_KEY);//lấy dựa theo key userData
        if (userData) {
            try {
            const parseUser = JSON.parse(userData); //chỉ lấy user từ iauth
            setUser(parseUser); // lưu và state
            console.log('userData sau khi parse:', user);
            }   catch (error) {
                console.log('Lỗi parse:', error);
            }
        }
    }, []);


    //Nếu không có userData
    if (!user) {
        return (
            <div>
                <p> KHÔNG TÌM THẤY DỮ LIỆU NGƯỜI DÙNG VUI LÒNG ĐĂNG NHẬP LẠI</p>
            </div>
        );
    }

    return (
        <div>
      <h1>Thông tin người dùng</h1>
      <div>
        <img src={user.image_url} alt={user.fullname} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <p><strong>Họ và Tên:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Tên đăng nhập:</strong> {user.username}</p>
        <p><strong>Số điện thoại:</strong> {user.phone}</p>
      </div>
    </div>
    );
};
export default Profile;