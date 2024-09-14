
import * as types from "../types/app";

//XỬ LÝ ĐĂNG NHẬP VỚI DỮ LIỆU TỪ API

export const setLoadingApp = (payload: boolean) => {
    return {
      type: types.LOADING_APP,
      payload
    }
};
