import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { ICourse, IPayloadSaveCourse } from '../../typing/courseType';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { saveCourseAction } from '../../redux/actions/courseAction';
import ModalConfirm from '../../components/modal/modalComfirm'; // Import ModalConfirm
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchStoreAction } from '../../redux/actions/storeActions';
import { fetchProgramListAction } from '../../redux/actions/programActions';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';



interface ModalSaveProps {
  show: boolean;
  handleClose: () => void;
  existingData?: ICourse;
  onRefresh: () => void;   
}

const ModalSave: React.FC<ModalSaveProps> = ({ show, handleClose, existingData, onRefresh }) => {

  //xử lý show modal confirm
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  
  // Lấy danh sách chi nhánh
  useEffect(() => {
    // Gọi API lấy danh sách chi nhánh
    dispatch(fetchStoreAction());
    dispatch(fetchProgramListAction(
      {
        limit: 100,
        offset: 0
      }
    ));
  },[dispatch]);

  const stores = useSelector((state: RootState) => state.store.stores);
  const programs = useSelector((state: RootState) => state.program.programList);


  const schema = yup.object().shape({
    name: yup.string().required('Tên khóa học không được để trống'),
    store_id: yup.number().required('Vui lòng chọn chi nhánh'),
    program_id: yup.number().required('Vui lòng chọn chương trình đào tạo'),
    price: yup.number().required('Học phí là bắt buộc').min(1, 'Học phí phải lớn hơn 0'),
    number_session: yup.number().required('Số buổi học là bắt buộc').min(1, 'Số buổi học phải lớn hơn 0').max(365, 'Số buổi học không được lớn hơn 365'),
    description: yup.string().max(300, 'Mô tả không được vượt quá 300 ký tự')
  })
  

  const [formValues, setFormValues] = useState<Omit<ICourse, 'created_by' | 'created_at' | 'created_name' | 'created_avatar'>>({
    id: 0,
    name: '',
    program_id: '',
    store_id: '',
    price: 0,
    number_session: 0,
    description: '',
    active: 1, // Giá trị mặc định cho active
    store_name: '', // Bạn có thể lấy từ danh sách stores dựa vào store_id
    program_type: '', // Giá trị mặc định hoặc lấy từ danh sách programs dựa vào program_id
    program_name: '',  // Giá trị mặc định hoặc lấy từ danh sách programs dựa vào program_id
    elementary_settings: [
      {
        id: 3,
        coefficient: 10,
      }, 
      {
        id: 4,
        coefficient: 10,
      }
    ],
    training_settings: []
  });

  console.log('FORM VALUES', formValues);

  
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

  
  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  }
 


  // Xác nhận việc tạo mới hoặc cập nhật
  const handleConfirm = async () => {
    const dataToSave:IPayloadSaveCourse = {
      name: formValues.name, // Sẽ là chuỗi
      program_id: Number(formValues.program_id), // Sẽ là số
      store_id: Number(formValues.store_id), // Sẽ là số
      description: formValues.description || '', // Sẽ là chuỗi
      active: formValues.active, // Sẽ là số
      price: formValues.price, // Sẽ là số
      number_session: formValues.number_session, // Sẽ là số
      elementary_settings: formValues.elementary_settings,
      training_settings: formValues.training_settings

    };
    if(existingData?.id){
      dataToSave.id = existingData.id
    }
    console.log('DATA TRUYỀN ĐI', dataToSave);

    // Gọi action để tạo mới hoặc cập nhật chương trình
    const result = await dispatch(saveCourseAction(dataToSave));
    if(result.meta.requestStatus === 'fulfilled'){
      //to do something
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose(); 
    }
  };

    
  
  // Hủy xác nhận
  const handleCancel = () => {
    setFormValues({
      id: 0,
      name: '',
      program_id: '',
      store_id: '',
      price: 0,
      number_session: 0,
      description: '',
      active: 1, // Giá trị mặc định cho active
      store_name: '', // Bạn có thể lấy từ danh sách stores dựa vào store_id
      program_type: '', // Giá trị mặc định hoặc lấy từ danh sách programs dựa vào program_id
      program_name: '',  // Giá trị mặc định hoặc lấy từ danh sách programs dựa vào program_id
      elementary_settings: [
        {
          id: 3,
          coefficient: 10,
        }, 
        {
          id: 4,
          coefficient: 10,
        }
      ],
      training_settings: []
    });
    handleClose();
  };



    // Khi mở modal trong chế độ cập nhật, thiết lập giá trị form
    useEffect(() => {
      if (show && existingData) {
        setFormValues({
          ...formValues,
          ...existingData
        });
      }
    }, [show, existingData]);

  return (
    <>
    <Modal open={show} onClose={handleCancel}>
      <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '500px', margin: '50px auto' }}>
        <h2>{existingData ? 'Cập nhật khóa học' : 'Tạo mới khóa học'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleOpenConfirmModal(); }}>
          {/* Tên khóa học */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Tên khóa học"
              name="name"
              value={formValues.name}
              onChange={handleTextFieldChange}
              required
            />
          </FormControl>

          {/* Chọn chi nhánh */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Chi nhánh</InputLabel>
            <Select
              name="store_id"
              value={formValues.store_id}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value={0}>Chọn chi nhánh</MenuItem>
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Chọn chương trình đào tạo */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Chương trình đào tạo</InputLabel>
            <Select
              name="program_id"
              value={formValues.program_id}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value={0}>Chọn chương trình</MenuItem>
              {programs.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Học phí */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Học phí"
              name="price"
              value={formValues.price}
              onChange={handleTextFieldChange}
              type="number"
              required
            />
          </FormControl>

          {/* Số buổi học */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Số buổi học"
              name="number_session"
              value={formValues.number_session}
              onChange={handleTextFieldChange}
              type="number"
              required
            />
          </FormControl>


          {/* Mô tả */}
          <FormControl fullWidth margin="normal">
            <TextField
              label="Mô tả"
              name="description"
              value={formValues.description}
              onChange={handleTextFieldChange}
              multiline
              rows={4}
            />
          </FormControl>

          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" type="submit">
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

export default ModalSave;
