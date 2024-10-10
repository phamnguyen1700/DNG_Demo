import axiosInstance from "../../src/common/utils/axiosConfig";


export const getProvincesService = async () => await axiosInstance.get("public/location/get-provinces?nation=1");