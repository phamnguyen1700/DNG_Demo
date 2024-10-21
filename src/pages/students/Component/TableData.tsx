import React from "react";
import { IStudent } from "../../../typing/studentType";
import "./../Style/index.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Pagination from "../../../components/pagination/pagination";
import { paths } from "../../../route/path";
import { Link } from "react-router-dom";
import moment from "moment";
// Create an array of 10 students

interface TableDataProps {
  students: IStudent[];
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TableData: React.FC<TableDataProps> = ({
  students,
  total,
  limit,
  currentPage,
  onPageChange,
}) => {
  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 h-12 border-b">
          <tr>
            <th className="text-center border border-gray-300 rounded w-24">
              ID
            </th>
            <th className="text-center border border-gray-300 rounded w-34">
              Mã hồ sơ
            </th>
            <th className="text-center border border-gray-300 rounded max-w-96">
              Họ và tên
            </th>
            <th className="text-center border border-gray-300 rounded w-32">
              Ngày sinh
            </th>
            <th className="text-center border border-gray-300 rounded w-36">
              Số điện thoại
            </th>
            <th className="text-center border border-gray-300 rounded w-32">
              Người tạo
            </th>
            <th className="text-center border border-gray-300 rounded w-32"></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr className="border-b hover:bg-gray-100" key={index}>
              <td className="text-center h-14 border w-24">{student.id}</td>
              <td className="h-14 border w-32 text-right pr-1">
                {student.profile_code}
              </td>
              <td className="h-14 border max-w-96 text-left pl-1">
                {student.full_name}
              </td>
              <td className="text-center h-14 border w-32">
                {student.birthday ? moment(student.birthday).format("L") : "N/A"}
              </td>
              <td className="text-center h-14 border w-36 text-right pr-1">
                {student.phone}
              </td>
              <td className="text-center h-14 border w-32">
                <div className="relative group">
                  <img
                    alt={student.created_name}
                    src={student.created_avatar}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg py-2 px-3 left-1/2 transform -translate-x-1/2 bottom-14 whitespace-nowrap">
                    ID: {student.created_by} - {student.created_name}
                  </div>
                </div>
              </td>
              <td className="text-center h-14 border w-32">
                <button>
                  <Link to={paths.student.detail(student.id)}>
                    <RemoveRedEyeOutlinedIcon />
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end pt-2">
      <Pagination
          total={total}
          limit={limit}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableData;
