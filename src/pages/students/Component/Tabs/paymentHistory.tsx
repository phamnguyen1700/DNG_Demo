import React from 'react'

const paymentData =[
    {
        id: 567,
        detail: [
            {
                total: 30000000,
                cash: 30000000,
                banking: 0,
                note: 'Đóng học phí',
                course: 'Khóa học VIP',
            }
        ],
        score: 9.5,
        store_name: 'Ho chi minh',
        status: 'Đã thanh toán',
        created_by: 1,
    }
]

export default function PaymentHistory() {
  return (
    <div className='shadow-md bg-white rounded-lg overflow-hidden'>
    <table className='min-w-full'>
      <thead className='bg-gray-200 h12 border-b'>
        <tr>
          <th className='text-sm text-center border border-gray-300 p-1'>Mã khóa học</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Khóa học</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Môn học</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Điểm trung bình</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Trạng thái</th>
          <th className='text-sm text-center border border-gray-300 p-1'>Người tạo</th>
        </tr>
      </thead>
      <tbody>
            {paymentData.map((item, index) => (
            <tr className='border-b hover:bg-gray-100' key={index}>
                <td className='text-sm text-center h-14 border p-1'>{item.id}</td>
                <td className='text-sm text-left h-14 border p-1'>
                    {item.detail.map((detail, idx) => (
                        <span
                        className=''
                        key={idx}
                        >
                        Tổng tiền: {detail.total}
                        <br/>
                        Tiền mặt: {detail.cash}
                        <br/>
                        Visa: {detail.banking}
                        <br/>
                        Nội dung: {detail.note}
                        <br/>
                        Khóa học: {detail.course}
                        </span>
                    ))}
                </td>
                <td className='text-sm text-center h-14 border p-1'>{item.store_name}</td>
                <td className='text-sm text-center h-14 border p-1'>{item.score}</td>
                <td className='text-sm text-center h-14 border p-1'>{item.status}</td>
                <td className='text-sm text-center h-14 border p-1'>{item.created_by}</td>
            </tr>
            ))}
      </tbody>
    </table>
  </div>
  )
}
