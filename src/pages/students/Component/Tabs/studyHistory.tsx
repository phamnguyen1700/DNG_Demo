import React from 'react';

const studyData = [
  {
    id: 1242,
    name: 'Khóa học VIP',
    price: '30,000,000',
    course: ['Lập trình ReactJS', 'Lập trình React Native', 'Lập trình NodeJS'],
    score: 9.5,
    status: 'Hoàn thành',
  },
];

export default function StudyHistory() {
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
          </tr>
        </thead>
        <tbody>
          {studyData.map((item, index) => (
            <tr className='border-b hover:bg-gray-100' key={index}>
              <td className='text-sm text-center h-14 border'>{item.id}</td>
              <td className='text-sm text-center h-14 border'>
                <div>{item.name}</div>
                <div>{item.price}</div>
              </td>
              <td className='text-sm text-center h-14 border'>
                {item.course.map((course, idx) => (
                  <span
                    key={idx}
                    className='inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full m-1'
                  >
                    {course}
                  </span>
                ))}
              </td>
              <td className='text-sm text-center h-14 border'>{item.score}</td>
              <td className='text-sm text-center h-14 border'>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
