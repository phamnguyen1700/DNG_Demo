import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ICourse, IPayloadSaveCourse, ICourseValidation } from '../../typing/courseType';
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
import { toast, ToastContainer } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS của react-toastify

interface ModalSaveProps {
  show: boolean;
  handleClose: () => void;
  existingData?: ICourse;
  onRefresh: () => void;   
}

const ModalSave: React.FC<ModalSaveProps> = ({ show, handleClose, existingData, onRefresh }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStoreAction());
    dispatch(fetchProgramListAction({ limit: 100, offset: 0 }));
  }, [dispatch]);

  const stores = useSelector((state: RootState) => state.store.stores);
  const programs = useSelector((state: RootState) => state.program.programList);

  const schema = yup.object().shape({
    name: yup.string().required('Tên khóa học không được để trống'),
    store_id: yup.number().required('Vui lòng chọn chi nhánh'),
    program_id: yup.number().required('Vui lòng chọn chương trình đào tạo'),
    price: yup.number().required('Học phí là bắt buộc').min(1, 'Học phí phải lớn hơn 0'),
    number_session: yup.number().required('Số buổi học là bắt buộc').min(1, 'Số buổi học phải lớn hơn 0').max(365, 'Số buổi học không được lớn hơn 365'),
    description: yup.string().max(300, 'Mô tả không được vượt quá 300 ký tự')
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ICourseValidation>({
    resolver: yupResolver(schema),
  });

  // Xử lý khi dữ liệu đã được validate thành công
  const handleSubmitWithValidation = (data: ICourseValidation) => {
    console.log('Dữ liệu đã được xác thực:', data);
    setShowConfirmModal(true);  // Mở modal xác nhận sau khi validate thành công
  };

  // Xác nhận việc tạo mới hoặc cập nhật sau khi người dùng xác nhận trong modal
  const handleConfirm = async (data: ICourseValidation) => {
    console.log('Dữ liệu form:', data);

    const dataToSave: IPayloadSaveCourse = {
      ...data,
      active: 1,
      elementary_settings: [{ id: 3, coefficient: 10 }, { id: 4, coefficient: 10 }],
      training_settings: [],
    };

    if (existingData?.id) {
      dataToSave.id = existingData.id;
    }
    console.log('DATA TRUYỀN ĐI', dataToSave);

    const result = await dispatch(saveCourseAction(dataToSave));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(`${existingData ? 'Cập nhật' : 'Tạo mới'} khóa học thành công!`);
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose(); 
    } else {
      toast.error(`${existingData ? 'Cập nhật' : 'Tạo mới'} khóa học thất bại!`);
    }
  };

  const handleCancel = () => {
    reset({
      name: '',
      program_id: 0,
      store_id: 0,
      price: 0,
      number_session: 0,
      description: '',
    });
    handleClose();
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  }

  useEffect(() => {
    if (show && existingData) {
      const dataToReset = {
        ...existingData,
        store_id: Number(existingData.store_id),
        program_id: Number(existingData.program_id),
      };
      reset(dataToReset);
    }
  }, [show, existingData, reset]);

  return (
    <>
     <ToastContainer/>
      <Modal open={show} onClose={handleCancel}>
        <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '500px', margin: '50px auto' }}>
          <h2>{existingData ? 'Cập nhật khóa học' : 'Tạo mới khóa học'}</h2>
          <form onSubmit={handleSubmit(handleSubmitWithValidation)}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Tên khóa học"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chi nhánh</InputLabel>
              <Select
                {...register('store_id')}
                defaultValue={existingData?.store_id || 0}  // Đảm bảo giá trị mặc định
                error={!!errors.store_id}
              >
                <MenuItem value={0}>Chọn chi nhánh</MenuItem>
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.id}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
              <p style={{ color: 'red' }}>{errors.store_id?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chương trình đào tạo</InputLabel>
              <Select
                {...register('program_id')}
                defaultValue={existingData?.program_id || 0}  // Đảm bảo giá trị mặc định
                error={!!errors.program_id}
              >
                <MenuItem value={0}>Chọn chương trình</MenuItem>
                {programs.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </Select>
              <p style={{ color: 'red' }}>{errors.program_id?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Học phí"
                type="number"
                {...register('price')}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Số buổi học"
                type="number"
                {...register('number_session')}
                error={!!errors.number_session}
                helperText={errors.number_session?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Mô tả"
                multiline
                rows={4}
                {...register('description')}
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
      <ModalConfirm
        show={showConfirmModal}
        title="Xác nhận"
        message={`Bạn có chắc chắn muốn ${existingData ? 'cập nhật' : 'tạo mới'} chương trình này?`}
        onConfirm={() => handleSubmit(handleConfirm)()}  // Gọi handleSubmit với handleConfirm sau khi xác nhận
        onClose={handleConfirmCancel}
      />
    </>
  );
};

export default ModalSave;
