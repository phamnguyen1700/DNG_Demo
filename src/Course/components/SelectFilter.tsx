// src/components/Filter.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, Box, Button } from '@mui/material';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchStore } from '../../redux/actions/storeActions';
import { fetchProgramList } from '../../redux/actions/programActions';
import { fetchCourseList } from '../../redux/actions/courseAction';
const Filter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const stores = useSelector((state: RootState) => state.store.stores);
    const programs = useSelector((state: RootState) => state.program.programList);
    // State tạm thời để lưu trữ giá trị của các bộ lọc
    const [store, setStore] = useState('');
    const [program, setProgram] = useState('');
    const [active, setActive] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchStore());
        dispatch(fetchProgramList({
            limit: 10,
            offset: 0,
        }));
    }, [dispatch]);

    // Hàm xử lý khi nhấn nút "Lọc"
    const applyFilters = () => {
        dispatch(fetchCourseList({
            limit: 10,
            offset: 0,
            store_id: store ,
            program_id: program ,
            active,
            key: searchText,
        }));
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <Select value={store} onChange={(e) => setStore(e.target.value)} displayEmpty>
            <MenuItem value="">Tất cả Chi nhánh</MenuItem>
                {stores.map((store) => (
                    <MenuItem key={store.id} value={store.id.toString()}>
                        {store.name}
                    </MenuItem>
                ))}
            </Select>

            <Select value={program} onChange={(e) => setProgram(e.target.value)} displayEmpty>
            <MenuItem value="">Tất cả Chương trình</MenuItem>
                {programs.map((program) => (
                    <MenuItem key={program.id} value={program.id.toString()}>
                        {program.name}
                    </MenuItem>
                ))}
            </Select>

            <Select value={active} onChange={(e) => setActive(e.target.value)} displayEmpty>
                <MenuItem value="">Tất cả Trạng thái</MenuItem>
                <MenuItem value="1">Hoạt động</MenuItem>
                <MenuItem value="0">Không hoạt động</MenuItem>
            </Select>

            <TextField 
                label="Tìm kiếm" 
                variant="outlined" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} 
            />

            <Button variant="contained" color="primary" onClick={applyFilters}>
                Tìm Kiếm
            </Button>
        </Box>
    );
};

export default Filter;
