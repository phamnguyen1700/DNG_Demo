// src/services/courseService.ts
import axiosInstance from '../../src/common/utils/axiosConfig';
//lấy danh sách khóa học
export const getCourseList = async (params: {
    limit: number;
    offset: number;
    store_id?: string;
    program_id?: string;
    active?: string;
    key?: string;
}) => {
    const url = '/course/list';
    const fullUrl = `${axiosInstance.defaults.baseURL}${url}`;
    console.log('URL gọi API:', fullUrl, 'Với các tham số:', params);

    
    const response = await axiosInstance.get('/course/list', { params });
    return response.data;
};


// src/services/courseService.ts
export const updateCourseStatus = async (id: string, active: string) => {
    // Chuyển đổi "active" thành "status" để phù hợp với API
    const response = await axiosInstance.put(`/course/update-status/${id}`, { status: active });
    return response.data;
};
