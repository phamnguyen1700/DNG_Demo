import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/Auth";
import Login from "../containers/Login/index";
import Home from "../containers/Home/index";
import { paths } from "./path";
import Main from "../layouts/Main";
import Student from "../pages/students";
import Detail from "../pages/students/detail";
import Program from "../containers/Program/index"; // Import ProgramList component
import Course from "../containers/Course/index"; // Import CourseList component
import Profile from "../../src/containers/User/profile"; // Import UserList component

export const routes = [
  { path: paths.overview, name: "Trang chủ", Component: Home },
  { path: paths.profile, name: "Hồ sơ", Component: Profile },
  { path: paths.student.list, name: "Danh sách học viên", Component: Student },
  {
    path: "/student/detail/:id",
    name: "Student Detail",
    Component: Detail,
  },
  { path: paths.program.list, name: "Danh sách chương trình", Component: Program },
  { path: paths.course.list, name: "Danh sách khóa học", Component: Course },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.auth.self} element={<AuthLayout />}>
        <Route path={paths.auth.login} element={<Login />} />
      </Route>
      <Route path={paths.overview} element={<Main />}>
        {routes.map(({ path, Component }, key) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
