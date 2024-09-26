// src/course/Course.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchCourseListAction } from '../../redux/actions/courseAction';
import { fetchStoreAction } from '../../redux/actions/storeActions'; // Nếu cần sử dụng danh sách chi nhánh
import TableData from './components/TableData';
import FilterData from './components/FilterSelect'; // Component lọc dữ liệu
import { ICourse as CourseType, ICourse } from '../../typing/courseType';
import { Button } from '@mui/material';
import { fetchProgramListAction } from '../../redux/actions/programActions'; // Nếu cần sử dụng danh sách chương trình khóa học
import ModalSave from './components/ModalSave'; // Component tạo mới hoặc cập nhật khóa học
import { toggleCourseStatus } from '../../../src/redux/actions/courseAction';
import ModalConfirm from '../../../src/components/modal/modalComfirm'; // Import ModalConfirm
import { IResponse } from '../../typing/app';

const DEFAULT_LIST = {
    list: [],
    total: 0
};
interface IPagination {
    limit: number;
    offset: number;
}
interface ICourseSearch extends IPagination {
    store_id?: number;
    active?: string;
    key?: string;
    program_id?: number;
}
interface INewFilter {
    programId: number;
    storeId: number;
    active: string;
    searchText: string;
}


const Course = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredCourseList, total, status } = useSelector((state: RootState) => state.course);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [selectedCourse, setSelectedCourse] = useState<CourseType>(); 
    const [courseToToggle, setCourseToToggle] = useState<CourseType>(); 
    const [curFilter, setFilter] = useState<INewFilter>({
        storeId: 0,
        active: "",
        searchText: "",
        programId: 0,
    });
    const [pagination, setPagination] = useState<IPagination>({
        limit: 10,
        offset: 0,
    });
    const [courses, setCourses] = useState<IResponse<ICourse>>(DEFAULT_LIST);


    const onUpdateFilter = (newFilter: INewFilter) => {
        setFilter(newFilter);
    };

    const onSearchData = (newFilter: INewFilter) => {

        const params: ICourseSearch = {
            limit: 10,
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
            if (params) {
                getAPI(params);
            }
            setFilter(newFilter);
    };


    useEffect(() => {
        const params: ICourseSearch = {
            limit: pagination.limit,
            offset: pagination.offset,
        };
        getAPI(params);
        setFilter({
            ...curFilter,
        });
    }, [dispatch, pagination]);


    const handleOpenConfirmModal = (course: CourseType) => {
        setCourseToToggle(course); // Lưu khóa học vào state
        console.log('Course to toggle:', course);
        setShowConfirmModal(true);
    }

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    }

      // Hàm toggle status
    const handleConfirmToggle = async () => {
        if (courseToToggle) {
            const newStatus = courseToToggle.active === 1 ? 0 : 1;
            const result = await dispatch(toggleCourseStatus({ id: courseToToggle.id, active: newStatus }));
            if (result.meta.requestStatus === 'fulfilled') {
                // Sau khi toggle thành công, tải lại danh sách khóa học
                const params: IPagination = {
                    limit: 10,
                    offset: 0,
                };
                getAPI(params);
            }
            setShowConfirmModal(false);
          } 
  };
  
    

    const handleEdit = (course: CourseType) => {
        // Handle course edit logic
        setSelectedCourse(course); // Lưu chương trình được chọn để chỉnh sửa
        setShowModal(true); // Mở Modal
        console.log('Edit course:', course);
    };

    const handlePageChange = (newOffset: number) => {
        setPagination({
            ...pagination,
            offset: newOffset,
        });
    };


    const handleOpenModal = () => {
        setSelectedCourse(undefined); // Đặt undefined để tạo mới chương trình
        setShowModal(true);
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleRefresh = () => {
        const params: IPagination = {
            limit: 10,
            offset: 0,
        };
        getAPI(params);
    }

    const getAPI = (params:any) =>{
        return dispatch(fetchCourseListAction(params))
    }


    return (
        <div>
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
                    limit={pagination.limit}
                    offset={pagination.offset}     
                    onEdit={handleEdit} // Gọi hàm handleEdit khi nhấn nút "Edit"
                    onPageChange={handlePageChange}
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
