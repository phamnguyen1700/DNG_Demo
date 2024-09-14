import React from 'react'
import loginAuth from '../../common/HOC/checkLogin/auth';
import { paths } from '../../route/path';
import { Button } from '@mui/material';
import useLogout from '../../common/hooks/logout';
import ResponsiveDrawer from '../../layouts/Main/index';
const Home: React.FC = () => {


  return (
    <ResponsiveDrawer> {/* Bọc nội dung Home trong DashboardLayoutAccount */}
      <div>
        <div>HOME</div>
      </div>
    </ResponsiveDrawer>
  )
}



export default loginAuth(Home, { navigation: false, navigationPath: paths.login });