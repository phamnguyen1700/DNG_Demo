import React, { useState } from 'react'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
const profileType = [
    {
        id: 1,
        name: 'Phiếu đăng ký',
    },
    {
        id: 2,
        name: 'Phiếu tuyển sinh',
    },
    {
        id: 3,
        name: 'Thẻ định danh mặt sau',
    },
    {
        id: 4,
        name: 'Thẻ định danh mặt trước',
    }
]
export default function DocumentStudent() {
    const [selectedType, setSelectedType] = useState('Tất cả');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    }

  return (
    <div className='p-4'>
        <label htmlFor='profileType' className='block mb-2 font-semibold'>
            Loại hồ sơ
        </label>
        <div className='flex item-center space-x-4'>
            <select
            id='profileType'
            value={selectedType}
            onChange={handleChange}
            className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 '
            >
                <option value={0}>Tất cả</option>
                {profileType.map((type) => (
                    <option key={type.id} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
            <button className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-600">
                Tải lên
            </button>
        </div>
        <div className="mt-8 text-center">
            <ReportProblemOutlinedIcon style={{ fontSize: '80'}}/>
            <p className="text-gray-500">Không tìm thấy hồ sơ</p>
        </div>
    </div>
  )
}
