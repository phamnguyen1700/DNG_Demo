import axiosInstance from "../../src/common/utils/axiosConfig";


export const getDistrictsService = async (provinceId: number) => await axiosInstance.get(`public/location/get-districts?province_id=${provinceId}`);