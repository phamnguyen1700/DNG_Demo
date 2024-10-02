import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, IconButton } from '@mui/material';
import { ICourse, IPayloadSaveCourse, ICourseValidation } from '../../../typing/courseType';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { saveCourseAction } from '../../../redux/actions/courseAction';
import ModalConfirm from '../../../components/modal/modalComfirm'; // Import ModalConfirm
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/store';
import { fetchStoreAction } from '../../../redux/actions/storeActions';
import { fetchProgramListAction } from '../../../redux/actions/programActions';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

interface ModalSaveProps {
  show: boolean;
  handleClose: () => void;
  existingData?: ICourse;
  onRefresh: () => void;   
  
}

const ModalSave: React.FC<ModalSaveProps> = ({ show, handleClose, existingData, onRefresh }) => {
  const defaultValues = {
    name: '',
    program_id: 0,
    store_id: 0,
    price: 0,
    number_session: 0,
    description: '',
    ...existingData,
  };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStoreAction());
    dispatch(fetchProgramListAction({ limit: 100, offset: 0 }));
  }, [dispatch]);

  const stores = useSelector((state: IRootState) => state.store.stores);
  const programs = useSelector((state: IRootState) => state.program.programList);


  const { control, handleSubmit, formState: { errors }, reset } = useForm<ICourseValidation>({
    defaultValues,
  });

  useEffect(() => {
    if (show) {
      if (existingData) {
        const dataToReset = {
          ...defaultValues,
          ...existingData,
          store_id: Number(existingData.store_id),
          program_id: Number(existingData.program_id),
        };
        reset(dataToReset);
      } else {
        reset(defaultValues);
      }
    }
  }, [show, existingData]);

  const handleConfirm = async (data: ICourseValidation) => {
    const dataToSave: IPayloadSaveCourse = {
      ...data,
      active: 1,
      elementary_settings: [{ id: 3, coefficient: 10 }, { id: 4, coefficient: 10 }],
      training_settings: [],
    };

    if (existingData?.id) {
      dataToSave.id = existingData.id;
    }

    const result = await dispatch(saveCourseAction(dataToSave));
    if (result.meta.requestStatus === 'fulfilled') {
      reset(defaultValues);
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose(); 
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    handleClose();
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  }

  return (
    <>
      <Modal open={show} onClose={handleCancel}>
        <Box sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '500px', margin: '50px auto', position: 'relative' }}>
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <h2>{existingData ? 'Cập nhật khóa học' : 'Tạo mới khóa học'}</h2>
          <form onSubmit={handleSubmit( () => setShowConfirmModal(true))}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Tên khóa học không được để trống' }}
                render={({ field }) => (
                  <TextField
                    label="Tên khóa học"
                    {...field}
                    error={!!errors.name}
                  />
                )}
                />
              <FormHelperText style={{ color: 'red'}}>{errors.name?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chi nhánh</InputLabel>
              <Controller
                name="store_id"
                control={control}
                rules={{ 
                  required: 'Chi nhánh không được để trống',
                  validate: value => value > 0 || 'Chi nhánh không được để trống'
                 }}
                render={({ field }) => (
                  <Select
                    label="Chi nhánh"
                    {...field}
                    error={!!errors.store_id}
                  >
                    {stores?.map((store) => (
                      <MenuItem key={store.id} value={store.id}>
                        {store.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText style={{ color: 'red'}}>{errors.store_id?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chương trình đào tạo</InputLabel>
                <Controller
                  name="program_id"
                  control={control}
                  rules={{ 
                    required: 'Chương trình đào tạo không được để trống',
                    validate: value => value > 0 || 'Chương trình đào tạo không được để trống'
                  }}
                  render={({ field }) => (
                    <Select
                      label="Chương trình đào tạo"
                      {...field}
                      error={!!errors.program_id}
                    >
                      {programs?.map((program) => (
                        <MenuItem key={program.id} value={program.id}>
                          {program.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              <FormHelperText style={{ color: 'red'}}>{errors.program_id?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Giá không được để trống',
                  validate: value => value > 0 || 'Giá lớn hơn 0'}}
                render={({ field }) => (
                  <TextField
                    label="Giá"
                    type="number"
                    {...field}
                    error={!!errors.price}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red'}}>{errors.price?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Controller
                name="number_session"
                control={control}
                rules={{
                  required: 'Số buổi không được để trống',
                  validate: value => value < 365 || 'Số buổi không được lớn hơn 365'}}
                render={({ field }) => (
                  <TextField
                    label="Số buổi"
                    type="number"
                    {...field}
                    error={!!errors.number_session}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red'}}>{errors.number_session?.message}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Controller
                name="description"
                control={control}
                rules={{ maxLength: { value: 300, message: 'Mô tả không được vượt quá 300 ký tự' } }}
                render={({ field }) => (
                  <TextField
                    label="Mô tả"
                    {...field}
                    multiline
                    rows={4}
                    error={!!errors.description}
                  />
                )}
              />
              <FormHelperText style={{ color: 'red'}}>{errors.description?.message}</FormHelperText>
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
