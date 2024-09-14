import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../containers/Login/index';
import Home from '../containers/Home/index';
import Profile from '../containers/User/profile';
import { paths } from './path';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.home} element={<Home />}/>
      <Route path={paths.profile} element={<Profile />}/>
    </Routes>
  );
};

export default AppRoutes;
