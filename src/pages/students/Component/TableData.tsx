import { IStudent } from '../../../typing/student'
import './../Style/index.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Pagination from '../../../components/pagination/pagination'
import { paths } from '../../../route/path'
import { Link } from 'react-router-dom';
// Create an array of 10 students
const students: IStudent[] = [
    { id: 1, fullName: 'Nguyen Van A', dateOfBirth: '2000-01-01', phoneNumber: '0123456789', created_by: 1 },
    { id: 2, fullName: 'Tran Thi B', dateOfBirth: '2001-02-02', phoneNumber: '0987654321', created_by: 2 },
    { id: 3, fullName: 'Le Van C', dateOfBirth: '2002-03-03', phoneNumber: '0112233445', created_by: 3 },
    { id: 4, fullName: 'Pham Thi D', dateOfBirth: '2003-04-04', phoneNumber: '0223344556', created_by: 4 },
    { id: 5, fullName: 'Do Van E', dateOfBirth: '2004-05-05', phoneNumber: '0334455667', created_by: 5 },
    { id: 6, fullName: 'Hoang Thi F', dateOfBirth: '2005-06-06', phoneNumber: '0445566778', created_by: 6 },
    { id: 7, fullName: 'Nguyen Van G', dateOfBirth: '2006-07-07', phoneNumber: '0556677889', created_by: 7 },
    { id: 8, fullName: 'Tran Thi H', dateOfBirth: '2007-08-08', phoneNumber: '0667788990', created_by: 8 },
    { id: 9, fullName: 'Le Van I', dateOfBirth: '2008-09-09', phoneNumber: '0778899001', created_by: 9 },
    { id: 10, fullName: 'Pham Thi J', dateOfBirth: '2009-10-10', phoneNumber: '0889900112', created_by: 10 }
  ];

export default function TableData() {
  return (
    <div>
        <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className="bg-gray-200 h-12 border-b">
                <tr>
                <th className='text-center border border-gray-300 rounded max-w-12'>ID</th>
                <th className='text-center border border-gray-300 rounded max-w-96'>Họ và tên</th>
                <th className='text-center border border-gray-300 rounded max-w-16'>Ngày sinh</th>
                <th className='text-center border border-gray-300 rounded max-w-16'>Số điện thoại</th>
                <th className='text-center border border-gray-300 rounded max-w-16'>Người tạo</th>
                <th className='text-center border border-gray-300 rounded max-w-12'></th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr className='border-b hover:bg-gray-100' key={index}>
                        <td className='text-center h-14 border max-w-12'>{student.id}</td>
                        <td className='text-center h-14 border max-w-96'>{student.fullName}</td>
                        <td className='text-center h-14 border max-w-16'>{student.dateOfBirth}</td>
                        <td className='text-center h-14 border max-w-16'>{student.phoneNumber}</td>
                        <td className='text-center h-14 border max-w-16'>{student.created_by}</td>
                        <td className='text-center h-14 border max-w-12'>
                            <button>
                                <Link to={paths.student.detail}></Link>
                                <RemoveRedEyeOutlinedIcon/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='flex justify-end'>
            <Pagination/>
        </div>
    </div>
  )
}
