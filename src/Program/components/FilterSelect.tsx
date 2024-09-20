import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, Box, Button } from '@mui/material';
import { fetchProgramList } from '../../redux/actions/programActions';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchStore } from '../../redux/actions/storeActions';

interface IProps{
    curFilter: any;
    onUpdateFilter: (newFilter: any) => void;
    onSearchData:(newFilter: any)=>void;
}
const FilterData: React.FC = (props:IProps) => {
    const {curFilter,onSearchData,onUpdateFilter} = props;
    /**
     * curFilter -> Thay đổi giá trị của các bộ lọc, update giá trị mới dựa vô curFilter (cũ): VD: onUpdateFilter({...curFilter, storeId: '1'})
     * onUpdateFilter -> onUpdateFilter({...curFilter, storeId: '1'});
     * onSearchData -> vừa vào gọi api kèm filter default: onSearchData({storeId: '1'});
     * useEffect(() => {
     * 
     * onSearchData({...curFilter, storeId: '1'});
     * 
     * }, []);
     * 
     * const applyFilters = () => {
     *     onSearchData(curFilter);
     * }
     * 
     */




    const dispatch = useDispatch<AppDispatch>();
        // Lấy danh sách chi nhánh
    const stores = useSelector((state: RootState) => state.store.stores);
    // State tạm thời để lưu trữ giá trị của các bộ lọc
    const [storeId, setStoreId] = useState<string>(''); // Sử dụng string để lưu trữ storeId
    const [active, setActive] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        // Gọi API lấy danh sách chi nhánh
        dispatch(fetchStore());

    }, [dispatch]);


    // Hàm xử lý khi nhấn nút "Lọc"
    const applyFilters = () => {
        // Gọi action fetchProgramList với các tham số lọc
        dispatch(fetchProgramList({
            limit: 10, // hoặc giá trị tùy ý
            offset: 0, // hoặc giá trị tùy ý
            store_id: storeId ,  // truyền trực tiếp storeId (sẽ là string)
            active,    // giá trị trạng thái
            key: searchText, // giá trị tìm kiếm
        }));
    };

    return (
        <Box display="flex" gap={2} alignItems="center">
            <Select 
                value={storeId} 
                onChange={(e) => setStoreId(e.target.value as string)} 
                displayEmpty
            >
                <MenuItem value="">Tất cả Chi nhánh</MenuItem>
                {stores.map((store) => (
                    <MenuItem key={store.id} value={store.id.toString()}>
                        {store.name}
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

export default FilterData;
