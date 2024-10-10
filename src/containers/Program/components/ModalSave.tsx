import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
} from "@mui/material";
import {
  IPayloadSaveProgram,
  IProgram,
  IProgramValidation,
} from "../../../typing/programsType";
import { AppDispatch, IRootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreAction } from "../../../redux/actions/storeActions";
import { saveProgramAction } from "../../../redux/actions/programActions";
import ModalConfirm from "../../../components/modal/modalComfirm";
import { useForm, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  existingData?: IProgram;
  onRefresh: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  handleClose,
  existingData,
  onRefresh,
}) => {
  const defaultValues = {
    name: "",
    store_id: 0,
    type: "",
    level: "",
    certificate_type: "",
    group_id: 38,
    description: "",
    ...existingData, // Sử dụng lại dữ liệu từ existingData nếu có
  };
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const stores = useSelector((state: IRootState) => state.store.stores);

  // useEffect(() => {
  //   /**REVIEW_CODE
  //    *
  //    * - Kiểm tra xem chổ này có cần thiết gọi lại API ds chi nhánh không khi đã có rồi
  //    *
  //    *
  //    * * */
  //   dispatch(fetchStoreAction());
  // }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProgramValidation>({
    defaultValues,
  });

  const handleConfirm = async (data: IProgramValidation) => {
    const dataToSave: IPayloadSaveProgram = { ...data, active: 1 };
    if (existingData?.id) dataToSave.id = existingData.id;

    const result = await dispatch(saveProgramAction(dataToSave));
    if (result.meta.requestStatus === "fulfilled") {
      reset();
      setShowConfirmModal(false);
      onRefresh && onRefresh();
      handleClose();
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    handleClose();
  };

  useEffect(() => {
    if (show) {
      if (existingData) {
        reset({ ...defaultValues, ...existingData });
      } else {
        reset(defaultValues);
      }
    }
  }, [show, existingData]);

  return (
    <div>
      <Modal open={show} onClose={handleCancel}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            maxWidth: "500px",
            margin: "50px auto",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <h2>
            {existingData ? "Cập nhật chương trình" : "Tạo mới chương trình"}
          </h2>

          <form onSubmit={handleSubmit(() => setShowConfirmModal(true))}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Tên chương trình không được để trống" }}
                render={({ field }) => (
                  <TextField
                    label="Tên chương trình"
                    {...field}
                    error={!!errors.name}
                  />
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.name?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Chi nhánh</InputLabel>
              <Controller
                name="store_id"
                control={control}
                rules={{
                  required: "Vui lòng chọn chi nhánh",
                  validate: (value) =>
                    value > 0 || "Vui lòng chọn chi nhánh hợp lệ",
                }}
                render={({ field }) => (
                  <Select
                    label="Chi nhánh"
                    {...field}
                    error={!!errors.store_id}
                  >
                    <MenuItem value={0} style={{ color: "GrayText" }}>
                      <em style={{ color: "GrayText", fontStyle: "normal" }}>
                        Chọn chi nhánh
                      </em>
                    </MenuItem>
                    {stores?.map((store) => (
                      <MenuItem key={store.id} value={store.id}>
                        {store.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.store_id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Loại chương trình</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Loại chương trình không được để trống" }}
                render={({ field }) => (
                  <Select
                    label="Loại chương trình"
                    {...field}
                    error={!!errors.type}
                  >
                    <MenuItem value="degree">Bằng cấp</MenuItem>
                    <MenuItem value="course">Khóa học</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.type?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Trình độ đào tạo</InputLabel>
              <Controller
                name="level"
                control={control}
                rules={{ required: "Trình độ không được để trống" }}
                render={({ field }) => (
                  <Select
                    label="Trình độ đào tạo"
                    {...field}
                    error={!!errors.level}
                  >
                    <MenuItem value="elementary">Sơ cấp</MenuItem>
                    <MenuItem value="secondary">Trung cấp</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.level?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Bằng cấp sau tốt nghiệp</InputLabel>
              <Controller
                name="certificate_type"
                control={control}
                rules={{ required: "Bằng cấp không được để trống" }}
                render={({ field }) => (
                  <Select
                    label="Bằng cấp sau tốt nghiệp"
                    {...field}
                    error={!!errors.certificate_type}
                  >
                    <MenuItem value="elementary">Chứng chỉ sơ cấp</MenuItem>
                    <MenuItem value="secondary">Chứng chỉ trung cấp</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.certificate_type?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Nhóm ngành dạy</InputLabel>
              <Controller
                name="group_id"
                control={control}
                rules={{
                  required: "Nhóm ngành không được để trống",
                  validate: (value) =>
                    value !== 0 || "Vui lòng chọn nhóm ngành hợp lệ",
                }}
                render={({ field }) => (
                  <Select
                    label="Nhóm ngành dạy"
                    {...field}
                    error={!!errors.group_id}
                  >
                    <MenuItem value={38}>group_id = 38</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.group_id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <Controller
                name="description"
                control={control}
                rules={{
                  maxLength: {
                    value: 300,
                    message: "Mô tả không được vượt quá 300 ký tự",
                  },
                }}
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
            </FormControl>

            <Box display="flex" justifyContent="space-between" marginTop="20px">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {existingData ? "Cập nhật" : "Tạo mới"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Modal Confirm */}
      <ModalConfirm
        show={showConfirmModal}
        title="Xác nhận"
        message={`Bạn có chắc chắn muốn ${existingData ? "cập nhật" : "tạo mới"} chương trình này?`}
        onConfirm={handleSubmit(handleConfirm)}
        onClose={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default ModalForm;
