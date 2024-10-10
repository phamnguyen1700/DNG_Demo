import { IPayloadSaveStudent, IFileUpload } from '../../src/typing/studentType';
import axiosInstance from '../common/utils/axiosConfig'
import { toast } from 'react-toastify' 

export const getStudentListService = async (params: {
    limit: number;
    offset: number;
    key?: string;
}) => {
  const url ='student/list'
  const fullUrl = `${axiosInstance.defaults.baseURL}${url}`
  console.log('URL gọi API:', fullUrl, 'Với các tham số:', params)

  const response = await axiosInstance.get(url, { params })
  return response
}




export const getStudentDetailService = async (id: number) => {
  const url = `/student/detail/?id=${id}`; // Cập nhật URL để gửi id theo dạng query param
  const fullUrl = `${axiosInstance.defaults.baseURL}${url}`
    console.log('URL gọi API:', fullUrl)
    
    const response = await axiosInstance.get(url)
    if (response.data) {
        return response.data
    } else {
      toast.error('Dữ liệu trả về không hợp lệ.')
    }
  }



  export const saveStudentService = async (studentData: IPayloadSaveStudent) => await axiosInstance.post('/student/update', studentData)

  export const uploadFileService = async (fileData: FormData) => { 
    const res = await axiosInstance.post('/upload-file/upload', fileData, {
        headers: {
            "Content-Type": "multipart/form-data", 
        },
    });
    if (res.data) {
        return res.data;
    } else {
        toast.error('Upload file không thành công.');
    }
};
