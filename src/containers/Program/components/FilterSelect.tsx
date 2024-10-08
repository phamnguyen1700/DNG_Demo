import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextField, Select, MenuItem, Box, Button } from "@mui/material";
import { IStore } from "../../../typing/storeType";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import debounce from "lodash/debounce"; 
interface INewFilter {
  storeId: number;
  active: number;
  searchText: string;
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

  const [searchValue, setSearchValue] = useState<string>(curFilter.searchText || "");

  const debouncedUpdateFilter = useMemo(() => { 
    return debounce((value: string) => {
      console.log("Giá trị sau khi ngưng nhập 1s:", value);
      onUpdateFilter({ ...curFilter, searchText: value });
  }, 1000);
}, [onUpdateFilter, curFilter])

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // Gọi hàm debounce để chỉ cập nhật sau khi người dùng ngừng nhập
    debouncedUpdateFilter(value);
  }
  // Cleanup function để hủy bỏ debounce khi component unmount
  useEffect(() => {
    return () => {
      debouncedUpdateFilter.cancel();
    };
  }, [debouncedUpdateFilter]);


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
    console.log("Dữ liệu filter:", curFilter); // Kiểm tra xem dữ liệu có chính xác không
    onSearchData(curFilter);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilters();
  }

  const stores = useSelector((state: IRootState) => state.store.stores); // Fetch danh sách chi nhánh


  // // Sử dụng useMemo để tạo và ghi nhớ phiên bản debounced của handleInputSearch
  // const debouncedHandleInputSearch = useMemo(() => {
  //   return debounce((value: string) => {
  //     onUpdateFilter({ ...curFilter, searchText: value });
  //   }, 1000); // 1000ms = 1s
  // }, [onUpdateFilter, curFilter]);

  // const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearchValue(value);
  //   // Sử dụng phiên bản đã debounce của handleInputSearch
  //   debouncedHandleInputSearch(value);
  // };

  /**REVIEW_CODE
   *  - Đối với bộ lọc có nhập dữ liệu key để tìm nên bỏ trong form để khi người dùng nhập tìm kiếm xong sẽ có thói quen nhấn Enter thay vì click nút Tìm kiếm
   * * */
  return (
    <form onSubmit={handleSubmit}>
    <Box display="flex" gap={2} alignItems="center">
      <Select
        value={curFilter.storeId || ""}
        onChange={(e) =>
          onUpdateFilter({ ...curFilter, storeId: Number(e.target.value) })
        }
        displayEmpty
        sx={{ flexBasis: "15%" }}>
        <MenuItem value="">Tất cả Chi nhánh</MenuItem>
        {stores?.map((store: IStore) => (
          <MenuItem key={store.id} value={store.id.toString()}>
            {store.name}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={curFilter.active}
        onChange={(e) =>
          onUpdateFilter({ ...curFilter, active: Number(e.target.value) })
        }
        displayEmpty
        sx={{ flexBasis: "15%" }}>
        {/* KIỂM TRA LẠI TRẠNG THÁI */}
        <MenuItem value={-1}>Tất cả Trạng thái</MenuItem>
        <MenuItem value={1}>Hoạt động</MenuItem>
        <MenuItem value={0}>Không hoạt động</MenuItem>
      </Select>

      <TextField
        label="Tìm kiếm"
        variant="outlined"
        value={searchValue}
        onChange={handleInputSearch}
        sx={{ flexBasis: "60%" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ flexBasis: "10%" }}>
        Tìm Kiếm
      </Button>
    </Box>
    </form>
  );
};

export default FilterData;
