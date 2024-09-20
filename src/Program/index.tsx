import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProgramList } from '../redux/actions/programActions';
import TableData from './components/TableData';
import FilterData from './components/FilterSelect';
import { Program, Program as ProgramType } from '../typing/programsType';
import { Button } from '@mui/material';
import ModalSave from './components/ModalSave';
import { IResponse } from '../typing/app';

const DEFAULT_LIST:IResponse<Program> = {
    list: [],
    total: 0
}
const Program = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredProgramList, total, status } = useSelector((state: RootState) => state.program);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<ProgramType | undefined>(undefined);
    const [filter, setFilter] = useState(null);
    const [programs, setPrograms] = useState<IResponse<Program>>(DEFAULT_LIST);

    useEffect(() => {
        dispatch(fetchProgramList({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }))
        .then(response => {
            console.log('API Response:', response);
        })
        .catch(error => {
            console.error('Error fetching program list:', error);
        });
    }, [dispatch, page, rowsPerPage]);

    // Xử lý khi nhấn "Edit" chương trình
    const handleEdit = (program: ProgramType) => {
        setSelectedProgram(program); // Lưu chương trình được chọn để chỉnh sửa
        setShowModal(true); // Mở modal
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = () => {
        setSelectedProgram(undefined); // Đặt undefined để tạo mới chương trình
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleRefresh = () => {
        //call api get list
    }
    const getAPI = (params:any) =>{
        //call api get list
    }
    /*
        onUpdateFilter = (newFilter)=> setFilter(newFilter);
        onSearchData = (newFilter?:any) => {
            setPage(0);
            getAPI(newFilter);
            setFilter(newFilter)
        }

    */
   useEffect(() => {
        // Gọi API lấy danh sách chương trình
        return () => {
            //reset store khi rời khỏi trang
            //distpatch(resetCourseList());
        }
   }, []);

   //ông nội -> cha -> con -> cháu -> con -> cha -> nội -> con -> cha. => useContext
    return (
        <div>
            {/* Nút tạo mới chương trình */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Create
                </Button>
            </div>
            <FilterData />
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <TableData
                    programs={filteredProgramList}
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onEdit={handleEdit} // Gọi hàm handleEdit khi nhấn nút "Edit"
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            )}
            {status === 'failed' && <p>Failed to load programs</p>}

            {/* Gọi ModalSave và truyền dữ liệu chương trình để chỉnh sửa */}
            <ModalSave 
                show={showModal} 
                handleClose={handleCloseModal} 
                existingData={selectedProgram} // Truyền dữ liệu chương trình nếu có
                onRefresh={handleRefresh}
            />
        </div>
    );
};

export default Program;
