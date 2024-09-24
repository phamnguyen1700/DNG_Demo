import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../layouts/Auth';
import Login from '../containers/Login/index';
import Home from '../containers/Home/index';
import { paths } from './path';
import Main from '../layouts/Main';
import Student from '../pages/students';
import Detail from '../pages/students/detail';
import Program from '../Program/index'; // Import ProgramList component
import Course from '../Course/index'; // Import CourseList component
import Profile from '../../src/containers/User/profile'; // Import UserList component
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.auth.self} element={<AuthLayout />}>
        <Route path={paths.auth.login} element={<Login />} />
      </Route>
      <Route path={paths.overview} element={<Main />}>
        <Route path={paths.overview} element={<Home />} />
        <Route path={paths.profile} element={<Profile />} />
        <Route path={paths.student.list} element={<Student />} />
        <Route path={paths.student.detail} element={<Detail />} />
        <Route path={paths.program.list} element={<Program />} /> {/* Thêm route cho Program */}
        <Route path={paths.course.list} element={<Course />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
