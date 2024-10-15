import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDistrictsService } from '../../services/districtService';
import IDistrict from '../..//typing/districtType';



export const fetchDistrictAction = createAsyncThunk<IDistrict[], number>(
    "district/fetchDistrict",
    async (
        province_id: number
    ) => {
        const res = await getDistrictsService(province_id);
        const { data, status } = res;
        if (status === 1) {
            return data;
        }
        return [];
    }
);