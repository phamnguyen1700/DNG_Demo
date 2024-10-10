import React, { useEffect, useState } from 'react';
import TableData from './Component/TableData';
import FilterData from './Component/FilterData';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
import './Style/index.css';
import { fetchStudentListAction } from '../../redux/actions/studentAction';

interface IStudentSearch {
  limit: number;
  offset: number;
  key?: string;
}

interface INewFilter {
  key: string;
}

const Student: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredStudentList, total, status } = useSelector(
    (state: IRootState) => state.student
  );
  const defaultPagination = {
    limit: 10,
    offset: 0,
    page: 1
  };
  
  const [curFilter, setCurFilter] = useState<INewFilter>({ key: '' });
  const [pagination, setPagination] = useState(defaultPagination);

  const getAPI = (params: IStudentSearch) => {
    return dispatch(fetchStudentListAction(params));
  }

  useEffect(() => {
    getAPI({
      limit: pagination.limit,
      offset: pagination.offset,
      key: curFilter.key
    });
  }, [pagination, curFilter]);

  const onUpdateFilter = (newFilter: INewFilter) => {
    setCurFilter(newFilter);
    setPagination({ ...pagination, page: 1, offset: 0 });
  }

  const onSearchData = (newFilter: INewFilter) => {
    const params: IStudentSearch = {
      limit: pagination.limit,
      offset: pagination.offset,
    };

    if (newFilter.key) {
      params.key = newFilter.key;
    }
    getAPI(params);
  }

  const onPageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * pagination.limit;
    setPagination((prev) => ({
      ...prev,
      page: newPage,
      offset: newOffset,
    }));
  }

  return (
    <div className='shadow-md py-4 px-4 rounded border border-gray-200 space-y-2'>
      <div className='shadow-md py-4 px-4 rounded border border-gray-200 bg-gray-100'>
        <FilterData
          curFilter={curFilter}
          onUpdateFilter={onUpdateFilter}
          onSearchData={onSearchData}
        />
      </div>
      <div className='shadow-md py-4 px-4 rounded border border-gray-200 bg-gray-100'>
        <TableData
          students={filteredStudentList}
          total={total}
          limit={pagination.limit}
          currentPage={pagination.page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Student;
