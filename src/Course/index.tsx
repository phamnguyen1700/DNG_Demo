// src/course/Course.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCourseList } from '../redux/actions/courseAction';
import { fetchStore } from '../redux/actions/storeActions'; // Nếu cần sử dụng danh sách chi nhánh
import TableData from './components/TableData';
import FilterData from './components/SelectFilter'; // Component lọc dữ liệu
import { IPayloadSaveCourse, ICourse as CourseType } from '../typing/courseType';
import { Button } from '@mui/material';
import { fetchProgramList } from '../redux/actions/programActions'; // Nếu cần sử dụng danh sách chương trình khóa học
import ModalSave from './components/ModalSave'; // Component tạo mới hoặc cập nhật khóa học
const DEFAULT_LIST = {
    list: [],
    total: 0
};


interface INewFilter {
    programId: string;
    storeId: string;
    active: string;
    searchText: string;
}

const Course = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredCourseList, total, status } = useSelector((state: RootState) => state.course);
    

    const [showModal, setShowModal] = useState(false); // State điều khiển Modal
    const [selectedCourse, setSelectedCourse] = useState<CourseType | undefined>(undefined); // State lưu khóa học được chọn

    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const onUpdateFilter = (newFilter: INewFilter) => {
        setFilter(newFilter);
    };

    
    const onSearchData = (newFilter: INewFilter) => {
        setPage(0); // Reset lại trang khi có thay đổi bộ lọc
        const params: any = {
            limit: rowsPerPage,
            offset: 0,
        };

        if (newFilter.storeId) {
            params.store_id = newFilter.storeId;
        }
        if (newFilter.active) {
            params.active = newFilter.active;
        }
        if (newFilter.searchText) {
            params.key = newFilter.searchText;
        }
        if (newFilter.programId) {
            params.program_id = newFilter.programId;
        }

        getAPI(params); // Gọi API tìm kiếm với các filter
        setFilter(newFilter);
    };

       
    // Fetch danh sách khóa học khi có sự thay đổi về trang hoặc bộ lọc
    useEffect(() => {
        dispatch(fetchStore()); // Fetch danh sách chi nhánh nếu cần
        dispatch(fetchProgramList({
            limit: 100,
            offset: 0,
        })); // Fetch danh sách chương trình khóa học nếu cần
        dispatch(fetchCourseList({
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }));
    }, [dispatch, page, rowsPerPage]);


    

    const programs = useSelector((state: RootState) => state.program.programList); // Lấy danh sách chương trình khóa học
    const stores = useSelector((state: RootState) => state.store.stores); // Fetch danh sách chi nhánh
    
    const [curFilter, setFilter] = useState<any>({
        storeId: '',
        active: '',
        searchText: '',
        stores: stores,
        programs: programs
    });

    

    const handleEdit = (course: CourseType) => {
        // Handle course edit logic
        setSelectedCourse(course); // Lưu chương trình được chọn để chỉnh sửa
        setShowModal(true); // Mở Modal
        console.log('Edit course:', course);
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset về trang đầu tiên
    };

    const handleOpenModal = () => {
        setSelectedCourse(undefined); // Đặt undefined để tạo mới chương trình
        setShowModal(true);
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleRefresh = () => {
        //call api get
        dispatch(fetchCourseList({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }))
    }

    const getAPI = (params:any) =>{
        //call api get list
        return dispatch(fetchCourseList(params))
    }


 
    return (
        <div>
            {/* Nút tạo mới khóa học */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Tạo mới
                </Button>
            </div>

            {/* Bộ lọc */}
            <FilterData
                curFilter={curFilter} // Cập nhật theo logic của bạn
                onUpdateFilter={onUpdateFilter}// Logic update filter
                onSearchData={onSearchData} // Logic tìm kiếm khóa học
            />

            {/* Hiển thị danh sách khóa học */}
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <TableData
                    courses={filteredCourseList}
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onEdit={handleEdit} // Gọi hàm handleEdit khi nhấn nút "Edit"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
            {status === 'failed' && <p>Failed to load courses</p>}

            {/* ModalSave để tạo mới hoặc cập nhật khóa học */}
            <ModalSave
                show={showModal}
                handleClose={handleCloseModal}
                existingData={selectedCourse} // Truyền dữ liệu khóa học nếu đang cập nhật
                onRefresh={handleRefresh}
            />
        </div>
    );
};

export default Course;
