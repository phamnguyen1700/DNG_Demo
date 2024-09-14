import { USER_KEY } from "../../constants/app";

export const setUserLocalStore = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export const getUserLocalStore = () => {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
}
export const removeLocalStoreByKey = () => {
    localStorage.removeItem(USER_KEY);
}