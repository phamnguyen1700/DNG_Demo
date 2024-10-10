import React from 'react'
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../redux/store';



export default function PaymentHistory() {
  const student = useSelector((state: IRootState) => state.student.studentDetail);
  return (
    <div className='shadow-md bg-white rounded-lg overflow-hidden'>
    <table className='min-w-full'>
      <thead className='bg-gray-200 h12 border-b'>
        <tr>
          <th className='text-sm text-center border border-gray-300 p-1'>Mã phiếu thu</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Chi tiết</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Chi nhánh</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Trạng thái</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Người tạo</th>
        </tr>
      </thead>
      <tbody>
            {student?.courses.map((item, index) => (
            <tr className='border-b hover:bg-gray-100' key={index}>
                <td className='text-sm text-center h-14 border p-1'>{item.invoice_course_id}</td>
                <td className='text-sm text-left h-14 border p-1'>
                        <span>
                        Tổng tiền: {item.total}
                        <br/>
                        Tiền mặt: {item.payment}
                        <br/>
                        Visa: {item.debit}
                        <br/>
                        Nội dung: Không có dữ liệu
                        <br/>
                        Khóa học: {item.course_name}
                        </span>
                </td>
                <td className='text-sm text-center h-14 border p-1'>{student.ward_name}</td>
                <td className='text-sm text-center h-14 border p-1'>{item.status}</td>
                <td className='text-sm text-center h-14 border p-1'>{student.created_avatar}</td>
            </tr>
            ))}
      </tbody>
    </table>
  </div>
  )
}
