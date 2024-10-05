import React from 'react'
import TableData from './Component/TableData'
import FilterData from './Component/FilterData'
import Pagination from '../../components/pagination/pagination' 
import './Style/index.css';
const Student: React.FC = () => {
  return (
      <div className='shadow-md py-4 px-4 rounded border border-gray-200 space-y-2'>
        <div className='shadow-md py-4 px-4 rounded border border-gray-200 bg-gray-100'>
          <FilterData/>
        </div>
        <div className='shadow-md py-4 px-4 rounded border border-gray-200 bg-gray-100'>
          <TableData/>
        </div>
      </div>
  )
}

export default Student;

