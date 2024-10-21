import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";

export default function PaymentHistory() {
  const student = useSelector(
    (state: IRootState) => state.student.studentDetail
  );
  console.log(student);
  return (
    <div className="shadow-md bg-white rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-200 h12 border-b">
          <tr>
            <th className="text-sm text-center border border-gray-300 p-1">
              Mã phiếu thu
            </th>
            <th className="text-sm text-center border border-gray-300 p-1">
              Chi tiết
            </th>
            <th className="text-sm text-center border border-gray-300 p-1">
              Chi nhánh
            </th>
            <th className="text-sm text-center border border-gray-300 p-1">
              Trạng thái
            </th>
            <th className="text-sm text-center border border-gray-300 p-1">
              Người tạo
            </th>
          </tr>
        </thead>
        <tbody>
          {student?.courses.map((item, index) => (
            <tr className="border-b hover:bg-gray-100" key={index}>
              <td className="text-sm text-center h-14 border p-1">
                {item.invoice_course_id}
              </td>
              <td className="text-sm text-left h-14 border p-1">
                <div className="flex justify-between">
                  <span>Tổng tiền:</span>
                  <span>
                    {item.total
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.total))
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tiền mặt:</span>
                  <span>
                    {item.payment
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.payment))
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Visa:</span>
                  <span>{item.debit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nội dung:</span>
                  <span>Không có dữ liệu</span>
                </div>
                <div className="flex justify-between">
                  <span>Khóa học:</span>
                  <span>{item.course_name}</span>
                </div>
              </td>
              <td className="text-sm text-center h-14 border p-1">Chi nhánh</td>
              <td className="text-sm text-center h-14 border p-1">
                {item.status === "completed" ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </td>
              <td className="text-sm text-center h-14 border p-1">
                <img
                  alt={student.created_name}
                  src={student.created_avatar}
                  className="w-10 h-10 rounded-full mx-auto"
                />
                <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg py-2 px-3 left-1/2 transform -translate-x-1/2 bottom-14 whitespace-nowrap">
                  ID: {student.created_by} - {student.created_name}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
