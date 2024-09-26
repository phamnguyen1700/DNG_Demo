import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { IPayloadSaveProgram, IProgram, IProgramValidation } from '../../../typing/programsType';
import { AppDispatch, RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreAction } from '../../../redux/actions/storeActions';
import { saveProgramAction } from '../../../redux/actions/programActions';
import ModalConfirm from '../../../components/modal/modalComfirm'; // Import ModalConfirm
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  existingData?: IProgram;
  onRefresh: () => void;
}

const scheme = yup.object().shape({
  name: yup.string().required('Tên chương trình không được để trống'),
  store_id: yup.number().moreThan(0, 'Vui lòng chọn chi nhánh').required('Vui lòng chọn chi nhánh'),
  type: yup.string().required('Loại chương trình không được để trống'),
  level: yup.string().required('Trình độ không được để trống'),
  certificate_type: yup.string().required('Bằng cấp không được để trống'),
  group_id: yup.number().required('Nhóm ngành không được để trống').typeError('Vui lòng chọn nhóm ngành hợp lệ'),
  description: yup.string().max(300, 'Mô tả không được vượt quá 300 ký tự')

});

const ModalForm: React.FC<ModalFormProps> = ({ show, handleClose, existingData, onRefresh }) => {
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const currentUser = useSelector((state: RootState ) => state.auth.user);

  // Lấy danh sách chi nhánh
  useEffect(() => {
    // Gọi API lấy danh sách chi nhánh
    dispatch(fetchStoreAction());
  },[dispatch]);

  const stores = useSelector((state: RootState) => state.store.stores);
  
  // State để lưu giá trị của form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IProgramValidation>({
    resolver: yupResolver(scheme),
  });

  const handleSubmitWithValidation = (data: IProgramValidation) => {
    console.log('Data after validation:', data);
    setShowConfirmModal(true);
  }


  const handleConfirm = async (data: IProgramValidation) => {
    console .log('Dữ liệu form:', data);

    const dataToSave:IPayloadSaveProgram = {
      ...data,
      active: 1,
    };
    if(existingData?.id){
      dataToSave.id = existingData.id
    }
    console.log('Dữ liệu truyền đi:', dataToSave);

    // Gọi action để tạo mới hoặc cập nhật chương trình
    const result = await dispatch(saveProgramAction(dataToSave));
    if(result.meta.requestStatus === 'fulfilled'){
      reset({
        name: '',
        store_id: 0,
        type: '',
        level: '',
        certificate_type: '',
        group_id: 38,
        description: '',
      });
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose();
    }
  };

 
  // Hủy xác nhận
  const handleCancel = () => {
    reset({
      name: '',
      store_id: 0,
      type: '',
      level: '',
      certificate_type: '',
      group_id: 38,
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
        };
        reset(dataToReset);
      } else {
        reset({
          name: '',
          store_id: 0,
          type: '',
          level: '',
          certificate_type: '',
          group_id: 38,
          description: '',
        })
      }
    }, [show, existingData, reset]);



  return (
    <div>
      <Modal open={show} onClose={handleCancel}>
        <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '500px', margin: '50px auto' }}>
          <h2>{existingData ? 'Cập nhật chương trình' : 'Tạo mới chương trình'}</h2>
          <form onSubmit={handleSubmit(handleSubmitWithValidation)}>
          <FormControl fullWidth margin="normal">
              <TextField
                label="Tên chương trình"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chi nhánh</InputLabel>
              <Select
                {...register('store_id')}
                error={!!errors.store_id}
                defaultValue={existingData?.store_id}
              >
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.id}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
              <p style={{ color: 'red' }}>{errors.store_id?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Loại chương trình</InputLabel>
              <Select
                {...register('type')}
                error={!!errors.type}
                defaultValue={existingData?.type}
              >
                <MenuItem value="degree">Bằng cấp</MenuItem>
                <MenuItem value="course">Khóa học</MenuItem>
              </Select>
              <p style={{ color: 'red' }}>{errors.type?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Trình độ đào tạo</InputLabel>
              <Select
                {...register('level')}
                error={!!errors.level}
                defaultValue={existingData?.level}
              >
                <MenuItem value="elementary">Sơ cấp</MenuItem>
                <MenuItem value="secondary">Trung cấp</MenuItem>
              </Select>
              <p style={{ color: 'red' }}>{errors.level?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Bằng cấp sau tốt nghiệp</InputLabel>
              <Select
                {...register('certificate_type')}
                error={!!errors.certificate_type}
                defaultValue={existingData?.certificate_type}
              >
                <MenuItem value="elementary">Chứng chỉ sơ cấp</MenuItem>
                <MenuItem value="secondary">Chứng chỉ trung cấp</MenuItem>
              </Select>
              <p style={{ color: 'red' }}>{errors.certificate_type?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Nhóm ngành dạy</InputLabel>
              <Select
                {...register('group_id')}
                error={!!errors.group_id}
                defaultValue={existingData?.group_id || 38}
              >
                <MenuItem value="38">group_id = 38</MenuItem>
              </Select>
              <p style={{ color: 'red' }}>{errors.group_id?.message}</p>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Mô tả"
                {...register('description')}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
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
        onConfirm={handleSubmit(handleConfirm)}
        onClose={handleConfirmCancel}
      />
    </div>
  );
};

export default ModalForm;
