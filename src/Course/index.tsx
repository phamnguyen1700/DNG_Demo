// src/course/Course.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCourseListAction } from '../redux/actions/courseAction';
import { fetchStoreAction } from '../redux/actions/storeActions'; // Nếu cần sử dụng danh sách chi nhánh
import TableData from './components/TableData';
import FilterData from './components/SelectFilter'; // Component lọc dữ liệu
import { ICourse as CourseType } from '../typing/courseType';
import { Button } from '@mui/material';
import { fetchProgramListAction } from '../redux/actions/programActions'; // Nếu cần sử dụng danh sách chương trình khóa học
import ModalSave from './components/ModalSave'; // Component tạo mới hoặc cập nhật khóa học
import { toggleCourseStatus } from '../../src/redux/actions/courseAction';
import ModalConfirm from '../../src/components/modal/modalComfirm'; // Import ModalConfirm

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
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showModal, setShowModal] = useState(false); // State điều khiển Modal
    const [selectedCourse, setSelectedCourse] = useState<CourseType | undefined>(undefined); // State lưu khóa học được chọn
    const [courseToToggle, setCourseToToggle] = useState<CourseType | null>(null); // State lưu course cần toggle

    const [curFilter, setFilter] = useState<any>({
        storeId: '',
        active: '',
        searchText: '',
        programId: '',
        stores: [],
        programs: []
    });

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
    
 

          
    const programs = useSelector((state: RootState) => state.program.programList); // Lấy danh sách chương trình khóa học
    const stores = useSelector((state: RootState) => state.store.stores); // Fetch danh sách chi nhánh
 
        console.log('PROGRAMS', programs);
       
    // Fetch danh sách khóa học khi có sự thay đổi về trang hoặc bộ lọc
    useEffect(() => {
        if (stores.length === 0) {
            dispatch(fetchStoreAction()); // Fetch danh sách chi nhánh nếu cần
        }
        if (programs.length === 0) {
            dispatch(fetchProgramListAction({
                limit: 100,
                offset: 0,
            })); // Fetch danh sách chương trình khóa học nếu cần
        }
        dispatch(fetchCourseListAction({
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }));
        setFilter({
            storeId: '',
            active: '',
            searchText: '',
            stores: stores,
            programs: programs
        });
    }, [dispatch, page, rowsPerPage, stores.length, programs.length]);





    const handleOpenConfirmModal = (course: CourseType) => {
        setCourseToToggle(course); // Lưu khóa học vào state
        setShowConfirmModal(true);
    }

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    }

      // Hàm toggle status
    const handleConfirmToggle = () => {
        if (courseToToggle) {
            const newStatus = courseToToggle.active === 1 ? 0 : 1;
            dispatch(toggleCourseStatus({ id: courseToToggle.id, active: newStatus }));
            dispatch(fetchCourseListAction({
                limit: rowsPerPage,
                offset: page * rowsPerPage,
            }));
            setShowConfirmModal(false); // Đóng modal sau khi xác nhận
            handleRefresh(); // Refresh lại danh sách khóa học
          }
  };
  
    

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
        dispatch(fetchCourseListAction({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }))
    }

    const getAPI = (params:any) =>{
        //call api get list
        return dispatch(fetchCourseListAction(params))
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
                    onToggleStatus={handleOpenConfirmModal} // Gọi hàm handleToggleStatus khi nhấn nút "Toggle"
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
            <ModalConfirm
                show={showConfirmModal}
                title="Xác nhận"
                message="Bạn có chắc chắn muốn thay đổi trạng thái khóa học này?"
                onConfirm={handleConfirmToggle} // Xác nhận toggle
                onClose={handleCloseConfirmModal} // Hủy toggle
        />
        </div>
    );
};

export default Course;
