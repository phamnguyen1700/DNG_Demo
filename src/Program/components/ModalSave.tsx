import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { IPayloadSaveProgram, IProgram } from '../../typing/programsType';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStore } from '../../redux/actions/storeActions';
import { saveProgramAction } from '../../redux/actions/programActions';
import ModalConfirm from '../../components/modal/modalComfirm'; // Import ModalConfirm

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  existingData?: IProgram;
  onRefresh: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ show, handleClose, existingData, onRefresh }) => {

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState ) => state.auth.user);

  // State để quản lý việc hiển thị của ModalConfirm
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Lấy danh sách chi nhánh
  useEffect(() => {
    // Gọi API lấy danh sách chi nhánh
    dispatch(fetchStore());
  },[dispatch]);

  const stores = useSelector((state: RootState) => state.store.stores);
  
  // State để lưu giá trị của form
  const [formValues, setFormValues] = useState<Omit<IProgram, 'created_by' | 'created_at' | 'created_name' | 'created_avatar'>>({
    id: 0,
    name: '',
    store_id: '',
    type: '',
    certificate_type: '',
    description: '',
    active: 1,
    level: '', // Thêm level vào form
    group_id: '', // Thiết lập giá trị mặc định nếu cần
  });



  // Xử lý khi giá trị input thay đổi cho TextField
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Xử lý khi giá trị input thay đổi cho Select
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name as string]: value });
  };

  // Xử lý khi người dùng nhấn "Tạo mới" hoặc "Cập nhật"
  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // Xác nhận việc tạo mới hoặc cập nhật
  const handleConfirm = async () => {
    const dataToSave:IPayloadSaveProgram = {
      name: formValues.name, // Sẽ là chuỗi
      store_id: Number(formValues.store_id), // Sẽ là chuỗi
      group_id: 38, // Sẽ là số hoặc chuỗi
      description: formValues.description || '', // Sẽ là chuỗi
      active: formValues.active, // Sẽ là số
      type: formValues.type, // Sẽ là chuỗi
      level: formValues.level, // Sẽ là chuỗi
      certificate_type: formValues.certificate_type, // Sẽ là chuỗi
    };
    if(existingData?.id){
      dataToSave.id = existingData.id
    }

    // Gọi action để tạo mới hoặc cập nhật chương trình
    const result = await dispatch(saveProgramAction(dataToSave));
    if(result.meta.requestStatus === 'fulfilled'){
      //to do something
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose();
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  }
 
  // Hủy xác nhận
  const handleCancel = () => {
    setFormValues({
      id: 0,
      name: '',
      store_id: '',
      type: '',
      certificate_type: '',
      description: '',
      active: 1,
      level: '',
      group_id: '',
    });
    handleClose();
  };
    // Khi mở modal trong chế độ cập nhật, thiết lập giá trị form
    useEffect(() => {
      if (show && existingData) {
        setFormValues(existingData);
      }
    }, [show, existingData]);



  return (
    <>
      <Modal open={show} onClose={handleCancel}>
        <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '500px', margin: '50px auto' }}>
          <h2>{existingData ? 'Cập nhật chương trình' : 'Tạo mới chương trình'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmModal(); }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Tên chương trình"
                name="name"
                value={formValues.name}
                onChange={handleTextFieldChange}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chi nhánh</InputLabel>
              <Select
                name="store_id"
                value={formValues.store_id}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="">Chọn chi nhánh</MenuItem>
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.id.toString()}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Loại chương trình</InputLabel>
              <Select
                name="type"
                value={formValues.type}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="degree">Bằng cấp</MenuItem>
                <MenuItem value="course">Khóa học</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Trình độ đào tạo</InputLabel>
              <Select
                name="level"
                value={formValues.level}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="elementary">Sơ cấp</MenuItem>
                <MenuItem value="secondary">Trung cấp</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Bằng cấp sau tốt nghiệp</InputLabel>
              <Select
                name="certificate_type"
                value={formValues.certificate_type}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="elementary">Chứng chỉ sơ cấp</MenuItem>
                <MenuItem value="secondary">Chứng chỉ trung cấp</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Nhóm ngành dạy</InputLabel>
              <Select
                name="group_id"
                value={formValues.group_id}
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="38">group_id = 38</MenuItem>
                {/* Thêm các lựa chọn khác ở đây nếu có */}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Mô tả"
                name="description"
                value={formValues.description || ''}
                onChange={handleTextFieldChange}
                multiline
                rows={4}
              />
            </FormControl>

            <Box display="flex" justifyContent="space-between" marginTop="20px">
              <Button variant="contained" color="secondary" onClick={handleCancel}>
                Hủy
              </Button>
              <Button variant="contained" color="primary" onClick={handleOpenConfirmModal}>
                {existingData ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Modal Confirm */}
      <ModalConfirm
        show={showConfirmModal}
        title="Xác nhận"
        message={`Bạn có chắc chắn muốn ${existingData ? 'cập nhật' : 'tạo mới'} chương trình này?`}
        onConfirm={handleConfirm}
        onClose={handleConfirmCancel}
      />
    </>
  );
};

export default ModalForm;
