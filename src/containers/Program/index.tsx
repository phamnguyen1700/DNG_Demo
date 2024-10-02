import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
import { fetchProgramListAction } from "../../redux/actions/programActions";
import TableData from "./components/TableData";
import FilterData from "./components/FilterSelect";
import { IProgram, IProgram as ProgramType } from "../../typing/programsType";
import { Button } from "@mui/material";
import ModalSave from "./components/ModalSave";
import { IResponse } from "../../typing/app";

const DEFAULT_LIST: IResponse<IProgram> = {
  list: [],
  total: 0,
};
interface IPagination {
  page?: number;
  limit: number;
  offset: number;
}
interface IProgramSearch extends IPagination {
  store_id?: number;
  active?: number;
  key?: string;
}

interface INewFilter {
  storeId: number;
  active: number;
  searchText: string;
}

interface IParams {
  limit: number;
  offset: number;
  store_id?: number;
  active?: number;
  key?: string;
}

const Program = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProgramList, total, status } = useSelector(
    (state: IRootState) => state.program
  );
  const { storeSelected } = useSelector((state: IRootState) => state.store);
  const defaultParams: IPagination = {
    page: 1,
    limit: 10,
    offset: 0,
  };
  const [pagination, setPagination] = useState<IPagination>(defaultParams);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramType>();
  const [curFilter, setFilter] = useState<INewFilter>({
    storeId: 0,
    active: -1,
    searchText: "",
  });
  const [programs, setPrograms] = useState<IResponse<IProgram>>(DEFAULT_LIST);

  const onUpdateFilter = (newFilter: INewFilter) => {
    setFilter(newFilter);
  };

  const getAPI = (params: IParams) => {
    return dispatch(fetchProgramListAction(params));
  };

  const onSearchData = (newFilter: INewFilter) => {
    const params: IProgramSearch = {
      limit: pagination.limit,
      offset: 0,
    };

    if (newFilter.storeId) {
      params.store_id = newFilter.storeId;
    }
    if (newFilter.active != -1) {
      params.active = newFilter.active;
    }
    if (newFilter.searchText) {
      params.key = newFilter.searchText;
    }
    setPagination(defaultParams);
    getAPI(params);
    setFilter(newFilter);

  };

  /*
effect dưới vừa dùng để render list lần đầu vào trang vừa để
render lại list khi có thay đổi từ các action khác
nên khi đẩy danh sách render đổi trang vào hàm dưới bị mất list ban đầu
nên em mới thêm flag
*/
  useEffect(() => {
    if(storeSelected){
      setPagination(defaultParams);
      setFilter({
        storeId: storeSelected?.id,
        active: -1,
        searchText: "",
      });
      const renderParams = {
        limit: defaultParams.limit,
        offset: defaultParams.offset,
        store_id: storeSelected?.id,
      };
      console.log("de", defaultParams);
      getAPI(renderParams);
    }
  }, [storeSelected]);

  const handleEdit = (program: ProgramType) => {
    setSelectedProgram(program); // Lưu chương trình được chọn để chỉnh sửa
    setShowModal(true); // Mở modal
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prevPagination) => {
      const newPagination = {
        ...prevPagination,
        page: newPage + 1,
        offset: newPage * prevPagination.limit,
      }; 
      getAPI({
        limit: newPagination.limit,
        offset: newPagination.offset,
        ...(curFilter.storeId !== 0 && { store_id: curFilter.storeId }),
      });
      return newPagination;
    });
  };

  const handleOpenModal = () => {
    setSelectedProgram(undefined); // Đặt undefined để tạo mới chương trình
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRefresh = () => {
    //call api get
    const params: IPagination = {
      limit: 10,
      offset: 0,
    };
    getAPI(params);
  };

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
      Chi nhánh: {storeSelected?.name}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Tạo Mới
        </Button>
      </div>
      <FilterData
        curFilter={curFilter}
        onUpdateFilter={onUpdateFilter}
        onSearchData={onSearchData}
      />
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <TableData
          programs={filteredProgramList}
          total={total}
          limit={pagination.limit}
          offset={pagination.offset}
          onEdit={handleEdit}
          onPageChange={handlePageChange}
        />
      )}
      {status === "failed" && <p>Failed to load programs</p>}
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
