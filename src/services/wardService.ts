import axiosInstance from '../../src/common/utils/axiosConfig';


export const getWardsService = async (districtId: number) => await axiosInstance.get(`public/location/get-wards?district_id=${districtId}`);