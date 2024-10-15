import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { routes } from "../../route/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
import { fetchStudentDetailAction } from "../../redux/actions/studentAction";

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>(); // Get id from the URL
  const dispatch = useDispatch<AppDispatch>();

  // Get student name from Redux store
  const student = useSelector(
    (state: IRootState) => state.student.studentDetail
  );
  const [studentName, setStudentName] = useState<string>("");

  // Fetch student details if ID exists in URL params
  useEffect(() => {
    if (params.id) {
      dispatch(fetchStudentDetailAction(Number(params.id)));
    }
  }, [params.id, dispatch]);

  // Set student name once student data is available
  useEffect(() => {
    if (student) {
      setStudentName(student.full_name);
    }
  }, [student]);

  // Initialize an empty breadcrumbs array
  let crumbs: Array<{ name: string; path: string }> = [];

  // Determine breadcrumbs based on the current location
  if (location.pathname === "/students") {
    // On the students list page
    crumbs = [
      { name: "Trang chủ", path: "/" },
      { name: "Danh sách học viên", path: "" },
    ];
  } else if (location.pathname.startsWith("/student/detail/")) {
    // On the student detail page
    crumbs = [
      { name: "Danh sách học viên", path: "/students" },
      { name: studentName || "Loading...", path: "" },
    ];
  } else if (location.pathname === "/programs") {
    // On the programs list page
    crumbs = [
      { name: "Trang chủ", path: "/" },
      { name: "Danh sách chương trình", path: "" },
    ];
  } else if (location.pathname === "/courses") {
    // On the courses list page
    crumbs = [
      { name: "Trang chủ", path: "/" },
      { name: "Danh sách khóa học", path: "" },
    ];
  } else {
    // Other pages
    crumbs = [{ name: "Trang chủ", path: "/" }];
  }

  // If there are no breadcrumbs or just one, don't show anything
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <div>
      {crumbs.map((crumb, index) =>
        index + 1 === crumbs.length ? (
          <span key={index}>{crumb.name}</span> // Show the last breadcrumb without a link
        ) : (
          <Link key={index} to={crumb.path}>
            {crumb.name} -{" "}
          </Link>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
