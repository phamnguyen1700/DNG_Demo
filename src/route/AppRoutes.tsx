import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/Auth';
import Login from '../containers/Login/index';
import Home from '../containers/Home/index';
import Profile from '../containers/User/profile';
import { paths } from './path';
import Main from '../layouts/Main';
import Student from '../pages/students';
import Detail from '../pages/students/detail';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.auth.self} element={<AuthLayout />}>
        <Route path={paths.auth.login} element={<Login />} />
      </Route>
      <Route path={paths.overview} element={<Main />}>
          <Route path={paths.overview} element={<Home />}/>
          <Route path={paths.student.list} element={<Student />} />
          <Route path={paths.student.detail} element={<Detail />}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
