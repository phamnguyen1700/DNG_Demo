import React from 'react';
import { TextField, Select, MenuItem, Box, Button } from '@mui/material';
import { IStore } from '../../typing/storeType';
interface IProps{
    curFilter: any;
    onUpdateFilter: (newFilter: any) => void;
    onSearchData:(newFilter: any)=>void;
}
const FilterData: React.FC<IProps>= ({ curFilter, onUpdateFilter, onSearchData }) => {
    // const {curFilter,onSearchData,onUpdateFilter} = props;
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

    
    // Hàm xử lý khi nhấn nút "Lọc"
    const applyFilters = () => {
        // Gọi action fetchProgramList với các tham số lọc
        console.log('Dữ liệu filter:', curFilter); // Kiểm tra xem dữ liệu có chính xác không
        onSearchData(curFilter);
    };


    return (
        <Box display="flex" gap={2} alignItems="center">
            <Select 
                value={curFilter.storeId} 
                onChange={(e) => onUpdateFilter({...curFilter, storeId: e.target.value})} 
                displayEmpty
            >
                <MenuItem value="">Tất cả Chi nhánh</MenuItem>
                {curFilter.stores.map((store: IStore) => (
                    <MenuItem key={store.id} value={store.id.toString()}>
                        {store.name}
                    </MenuItem>
                ))}
            </Select>

            <Select value={curFilter.active} onChange={(e) => onUpdateFilter({ ...curFilter, active: e.target.value})}
            displayEmpty
            >
                <MenuItem value="">Tất cả Trạng thái</MenuItem>
                <MenuItem value="1">Hoạt động</MenuItem>
                <MenuItem value="0">Không hoạt động</MenuItem>
            </Select>

            <TextField 
                label="Tìm kiếm" 
                variant="outlined" 
                value={curFilter.searchText}
                onChange={(e) => onUpdateFilter({ ...curFilter, searchText: e.target.value})} 
            />

            <Button variant="contained" color="primary" onClick={applyFilters}>
                Tìm Kiếm
            </Button>
        </Box>
    );
};

export default FilterData;
