import { useEffect, useMemo, useState } from 'react';
import './../Style/index.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import debounce from "lodash/debounce";

interface INewFilter {
  key: string;
}

interface IProps {
  curFilter: INewFilter;
  onUpdateFilter: (newFilter: INewFilter) => void;
  onSearchData: (newFilter: INewFilter) => void;
}

const FilterData: React.FC<IProps> = ({
  curFilter,
  onUpdateFilter,
  onSearchData,
}) => {
  const [searchValue, setSearchValue] = useState<string>(curFilter.key || "");

  const debouncedUpdateFilter = useMemo(() => { 
    return debounce((value: string) => {
      console.log("Giá trị sau khi ngưng nhập 500ms:", value);
      onUpdateFilter({ ...curFilter, key: value });
  }, 500);
}, [onUpdateFilter, curFilter])

const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchValue(value);
  // Gọi hàm debounce để chỉ cập nhật sau khi người dùng ngừng nhập
  debouncedUpdateFilter(value);
}

useEffect(() => {
  return () => {
    debouncedUpdateFilter.cancel();
  };
}, [debouncedUpdateFilter]);


const applyFilters = () => {
  // Gọi action fetchProgramList với các tham số lọc
  console.log("Dữ liệu filter:", curFilter); // Kiểm tra xem dữ liệu có chính xác không
  onSearchData(curFilter);
};

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  applyFilters();
}



  return (
    <div className='flex space-x-4'>
        <input 
        className="placeholder:italic placeholder:text-slate-400 block bg-white h-12 w-1/3 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-800 focus:ring-1 sm:text-sm" 
        placeholder="Tìm kiếm học viên"
        type="text" 
        value={searchValue}
        onChange={handleInputSearch}
        />
        <button 
        className='h-12 w-36 text-white bg-violet-800 border rounded' 
        onClick={handleSubmit}>
            <SearchOutlinedIcon/>
            Tìm kiếm
        </button>
    </div>
  )
}

export default FilterData;