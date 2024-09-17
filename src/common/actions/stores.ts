import { ACCESS_TOKEN_KEY, USER_KEY } from "../../constants/app";

export const setUserLocalStore = (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export const getUserLocalStore = () => {
    const user = localStorage.getItem(USER_KEY);
    if (!user) {
        return null;
    }
    return JSON.parse(user);
}
export const removeLocalStoreByKey = () => {
    localStorage.removeItem(USER_KEY);
}
export const isAuth = () => {
    return Boolean(getUserLocalStore());
}
export const setTokenLocalStore = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
export const getTokenLocalStore = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}