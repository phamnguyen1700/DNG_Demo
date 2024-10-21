import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStudentListService,
  getStudentDetailService,
  saveStudentService,
  uploadFileService,
} from "../../services/studentService";
import { toast } from "react-toastify";
import { IFileUpload, IPayloadSaveStudent } from "../../typing/studentType";

export const fetchStudentListAction = createAsyncThunk(
  "student/fetchStudentList",
  async (
    params: {
      limit: number;
      offset: number;
      key?: string;
    },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await getStudentListService(params);
    if (res.data && res.data.list) {
      return fulfillWithValue(res.data);
    } else {
      toast.error("Danh sách trả về null hoặc không hợp lệ.");
      return rejectWithValue("Danh sách trả về null hoặc không hợp lệ.");
    }
  }
);

export const fetchStudentDetailAction = createAsyncThunk(
  "student/fetchStudentDetail",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await getStudentDetailService(id);
      if (res) {
        return fulfillWithValue(res); // Trả về dữ liệu `res.data`
      } else {
        toast.error("Dữ liệu trả về không hợp lệ.");
        return rejectWithValue({message: res.message || "Dữ liệu trả về không hợp lệ."});
      }
    } catch (error: any) {
      toast.error("Đã xảy ra lỗi");
      return rejectWithValue({message: error.message || "Đã xảy ra lỗi"});
    }
  }
);

export const saveStudentAction = createAsyncThunk(
  "student/saveStudent",
  async (
    studentData: IPayloadSaveStudent,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const payload = {
        info: {
          id: studentData.info.id,
          profile_code: studentData.info.profile_code,
          full_name: studentData.info.full_name,
          sex: studentData.info.sex,
          phone: studentData.info.phone,
          avatar: studentData.info.avatar,
          birthday: studentData.info.birthday,
          email: studentData.info.email,
          id_card: studentData.info.id_card,
          date_card: studentData.info.date_card,
          issued_card_id: studentData.info.issued_card_id,
          note: studentData.info.note,
          province_id: studentData.info.province_id,
          district_id: studentData.info.district_id,
          ward_id: studentData.info.ward_id,
          address: studentData.info.address,
        },
        contacts: studentData.contacts,
        courses: studentData.courses,
        media: studentData.media,
      };
      const res = await saveStudentService(payload);
      if (res.status === 1) {
        toast.success("Thành công");
        return fulfillWithValue(res.data);
      } else {
        return rejectWithValue("Thất bại");
      }
    } catch (error : any) {
      toast.error("Thất bại");
      return rejectWithValue({ message: error.message || "Thất bại" });
    }
  }
);

export const uploadFileAction = createAsyncThunk(
  "student/uploadFile",
  async (fileData: IFileUpload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", fileData.file);
      formData.append("type", fileData.type);
      formData.append("folder", fileData.folder);
      formData.append("resizelevel", fileData.resizelevel.toString());
      const res = await uploadFileService(formData);
      if (res) {
        toast.success("Upload file thành công");
        return fulfillWithValue(res);
      } else {
        toast.error("Upload file thất bại");
        return rejectWithValue("Upload file thất bại");
      }
    } catch (error) {
      toast.error("Upload file thất bại");
      return rejectWithValue("Upload file thất bại");
    }
  }
);
