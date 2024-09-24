import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProgramListAction } from '../redux/actions/programActions';
import TableData from './components/TableData';
import FilterData from './components/FilterSelect';
import { IProgram, IProgram as ProgramType } from '../typing/programsType';
import { Button } from '@mui/material';
import ModalSave from './components/ModalSave';
import { IResponse } from '../typing/app';
import { fetchStoreAction } from '../redux/actions/storeActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import CSS của react-toastify


const DEFAULT_LIST:IResponse<IProgram> = {
    list: [],
    total: 0
}

interface INewFilter {
    storeId: string;
    active: string;
    searchText: string;
}
const Program = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredProgramList, total, status } = useSelector((state: RootState) => state.program);
    //lấy danh sách chi nhánh

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<ProgramType | undefined>(undefined);

        //ngậm giá trị truyền đi 
    const [curFilter, setFilter] = useState<any>({
        storeId: '',
        active: '',
        searchText: '',
        stores: [],
    });


    //danh sách default
    const [programs, setPrograms] = useState<IResponse<IProgram>>(DEFAULT_LIST);

    //cập nhật filter
    const onUpdateFilter = (newFilter: INewFilter) => {
        setFilter(newFilter);
    }

    //gọi api tìm kiếm
    const onSearchData = (newFilter: INewFilter) => {
        setPage(0);

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
    
//sửa lại cái này
        getAPI(params);
        setFilter(newFilter);
    }

    const stores = useSelector((state: RootState) => state.store.stores);

    useEffect(() => {
        if (stores.length === 0) {
            dispatch(fetchStoreAction());
        }
        dispatch(fetchProgramListAction({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }));
        setFilter({
            ...curFilter,
            stores: stores
        });
    }, [dispatch, page, rowsPerPage, stores.length]);

    


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
        //call api get
        dispatch(fetchProgramListAction({ 
            limit: rowsPerPage,
            offset: page * rowsPerPage,
        }));
        // toast.success('Danh sách chương trình đã được cập nhật!');  // Thông báo thành công
    }
    const getAPI = (params:any) =>{
        //call api get list
        dispatch(fetchProgramListAction(params))
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
            <FilterData 
                curFilter={curFilter} 
                onUpdateFilter={onUpdateFilter} 
                onSearchData={onSearchData}
            />
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
