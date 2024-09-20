export interface ILogin{
    username: string;
    password: string;
    rememberPassword?: string;
}
export interface IUser{
    id: number;
        phone: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        fullname: string;
        image_url: string;
        main_group_id: number;
        rememberPassword: string;
}
export interface IAuth{
    token: string;  
    user: IUser
}
export interface IAuthState {
    loading: boolean;
    user: IUser | null;
    error: string | null;
}

export interface IMenuItem {
    id: number,
    name: string,
    url: string,
    parent_id: number,
    index: number,
    active: string,
    module: string,
    children?: IMenuItem[]//children có thể có hoặc không
}

export interface IMenuResponse {
    status: number,
    message: string,
    data: MenuItem[]
}