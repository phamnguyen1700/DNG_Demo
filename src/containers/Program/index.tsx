import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchProgramListAction } from '../../redux/actions/programActions';
import TableData from './components/TableData';
import FilterData from './components/FilterSelect';
import { IProgram, IProgram as ProgramType } from '../../typing/programsType';
import { Button } from '@mui/material';
import ModalSave from './components/ModalSave';
import { IResponse } from '../../typing/app';
import { fetchStoreAction } from '../../redux/actions/storeActions';

const DEFAULT_LIST:IResponse<IProgram> = {
    list: [],
    total: 0
}
interface IPagination {
    page?: number,
    limit: number,
    offset: number,
}
interface IProgramSearch extends IPagination {
    store_id?: number;
    active?: string;
    key?: string;
}

interface INewFilter {
    storeId: number;
    active: string;
    searchText: string;
}

interface IParams {
    limit: number;
    offset: number;
    store_id?: number;
    active?: string;
    key?: string;
}


const Program = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredProgramList, total, status } = useSelector((state: RootState) => state.program);
    const [pagination, setPagination] = useState<IPagination>({
        page: 0,
        limit: 10,
        offset: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<ProgramType>();
    const [curFilter, setFilter] = useState<INewFilter>({
        storeId: 0,
        active: "",
        searchText: '',
    });
    const [programs, setPrograms] = useState<IResponse<IProgram>>(DEFAULT_LIST);


    const onUpdateFilter = (newFilter: INewFilter) => {
        setFilter(newFilter);
    }

    const onSearchData = (newFilter: INewFilter) => {

        const params: IProgramSearch = {
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

            getAPI(params);
            setFilter(newFilter);
    }


    useEffect(() => {
        const params = {
            limit: pagination.limit,
            offset: pagination.offset,
        };
        getAPI(params);
    }, [dispatch, pagination]);

    
    const handleEdit = (program: ProgramType) => {
        setSelectedProgram(program); // Lưu chương trình được chọn để chỉnh sửa
        setShowModal(true); // Mở modal
    };

    const handlePageChange = (newPage: number) => {
        setPagination({
            ...pagination,
            page: newPage,
            offset: newPage * pagination.limit,
        });
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
        const params: IPagination = {
            limit: 10,
            offset: 0,
        };
        getAPI(params);
    }


    const getAPI = (params: IParams) =>{
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
//    useEffect(() => {
//         // Gọi API lấy danh sách chương trình
//         return () => {
//             //reset store khi rời khỏi trang
//             //distpatch(resetCourseList());
//         }
//    }, []);

   //ông nội -> cha -> con -> cháu -> con -> cha -> nội -> con -> cha. => useContext
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Tạo Mới
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
                    limit={pagination.limit}
                    offset={pagination.offset}                    
                    onEdit={handleEdit} 
                    onPageChange={handlePageChange} 
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
