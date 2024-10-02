import React from 'react';
import { TextField, Select, MenuItem, Box, Button } from '@mui/material';
import { IStore } from '../../../typing/storeType';
import { IProgram } from '../../../typing/programsType'; // Giả sử bạn có type cho chương trình khóa học
import { IRootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

interface INewFilter {
  storeId: number;
  programId: number;
  active: number;
  searchText: string;
}

interface IProps {
  curFilter: INewFilter;
  onUpdateFilter: (newFilter: INewFilter) => void;
  onSearchData: (newFilter: INewFilter) => void;
}

const FilterData: React.FC<IProps> = ({ curFilter, onUpdateFilter, onSearchData }) => {
  // Hàm xử lý khi nhấn nút "Lọc"
  const applyFilters = () => {
    onSearchData(curFilter);
  };

  const stores = useSelector((state: IRootState) => state.store.stores); // Fetch danh sách chi nhánh
  const programs = useSelector((state: IRootState) => state.program.programList); // Fetch danh sách chương trình khóa học


  return (
<Box display="flex" gap={2} alignItems="center">
  {/* Select Chi nhánh */}
  <Select
    value={curFilter.storeId || ""}
    onChange={(e) => onUpdateFilter({ ...curFilter, storeId: Number(e.target.value) })}
    displayEmpty
    sx={{ flexBasis: '10%' }}  // 20% cho select Chi nhánh
  >
    <MenuItem value="">Tất cả Chi nhánh</MenuItem>
    {stores?.map((store: IStore) => (
      <MenuItem key={store.id} value={store.id}>
        {store.name}
      </MenuItem>
    ))}
  </Select>

  {/* Select Chương trình khóa học */}
  <Select
    value={curFilter.programId || ""} //xử lý để lấy giá trị đầu tiên
    onChange={(e) => onUpdateFilter({ ...curFilter, programId: Number(e.target.value) })}
    displayEmpty
    sx={{ flexBasis: '50%' }}  // 20% cho select Chương trình
  >
    <MenuItem value="">Tất cả Chương trình</MenuItem>
    {programs?.map((program: IProgram) => (
      <MenuItem key={program.id} value={program.id}>
        {program.name}
      </MenuItem>
    ))}
  </Select>

  {/* Select Trạng thái */}
  <Select
    value={curFilter.active}
    onChange={(e) => onUpdateFilter({ ...curFilter, active: Number(e.target.value) })}
    displayEmpty
    sx={{ flexBasis: '10%' }}  // 20% cho select Trạng thái
  >
    <MenuItem value={-1}>Tất cả Trạng thái</MenuItem>
    <MenuItem value={1}>Hoạt động</MenuItem>
    <MenuItem value={0}>Không hoạt động</MenuItem>
  </Select>

  {/* Ô tìm kiếm */}
  <TextField
    label="Tìm kiếm"
    variant="outlined"
    value={curFilter.searchText}
    onChange={(e) => onUpdateFilter({ ...curFilter, searchText: e.target.value })}
    sx={{ flexBasis: '20%' }}  // 30% cho ô tìm kiếm
  />

  {/* Nút tìm kiếm */}
  <Button variant="contained" color="primary" onClick={applyFilters} sx={{ flexBasis: '10%' }}>
    Tìm Kiếm
  </Button>
</Box>
  );
};

export default FilterData;
