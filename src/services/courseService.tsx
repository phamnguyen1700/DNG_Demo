// src/services/courseService.ts
import axiosInstance from '../../src/common/utils/axiosConfig';
import { IPayloadSaveCourse } from '../typing/courseType';
//lấy danh sách khóa học
export const getCourseListService = async (params: {
    limit: number;
    offset: number;
    store_id?: number;
    program_id?: number;
    active?: string;
    key?: string;
}) => {
    const url = '/course/list';
    const fullUrl = `${axiosInstance.defaults.baseURL}${url}`;
    console.log('URL gọi API:', fullUrl, 'Với các tham số:', params);

    
    const response = await axiosInstance.get('/course/list', { params });
    return response.data;
};






export const saveCourseService = async (courseData: IPayloadSaveCourse) => await axiosInstance.post('/course/save', courseData)








// src/services/courseService.ts
export const updateCourseStatus = async (id: number, status: number) => {
    // Chuyển đổi "active" thành "status" để phù hợp với API
    console.log('ID:', id, 'STATUS:', status);
    const response = await axiosInstance.post('/course/update-status', { id, status });
    console.log('SERVICE!!!', response);
    return response;
};
    