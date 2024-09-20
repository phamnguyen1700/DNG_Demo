// src/course/Course.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCourseList } from '../redux/actions/courseAction';
import TableData from './components/TableData';
import Filter from './components/SelectFilter';
import { Course as CourseType } from '../typing/courseType';

const Course = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredCourseList, total, status } = useSelector((state: RootState) => state.course);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchCourseList({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
            // Có thể bỏ truyền filters vào đây nếu dữ liệu đã được tải sẵn và chỉ muốn lọc trên client
        }))
        .then(response => {
            console.log('API Response:', response);
        })
        .catch(error => {
            console.error('Error fetching course list:', error);
        });
    }, [dispatch, page, rowsPerPage]);

    const handleEdit = (course: CourseType) => {
        // Handle course edit
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Filter />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <TableData
                    courses={filteredCourseList}
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onEdit={handleEdit}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
            {status === 'failed' && <p>Failed to load courses</p>}
        </div>
    );
};

export default Course;
