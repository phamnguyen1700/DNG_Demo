import axiosInstance from '../../src/common/utils/axiosConfig';
import { ACCESS_TOKEN_KEY } from '../constants/app';
import { IPayloadSaveProgram } from '../typing/programsType';
//lấy danh sách chương trình
export const getProgramList = async (params: {
    limit: number;
    offset: number;
    store_id?: string;
    active?: string;
    key?: string;
}) => {
    const url = '/program/list';
    const fullUrl = `${axiosInstance.defaults.baseURL}${url}`;
    console.log('URL gọi API:', fullUrl, 'Với các tham số:', params);

    const response = await axiosInstance.get('/program/list', { params });
    return response;
};

export const saveProgramService = async (programData: IPayloadSaveProgram) => await axiosInstance.post('/program/save', programData)




