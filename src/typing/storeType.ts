export interface IStore {
    id:  number;
    name: string;
    address: string;
    terminalCode?: string;
    terminalID?: string;
    admin_store_id: number;
    learning_session_setting?:[]; // nếu muốn làm việc với mảng chuỗi
}


export interface IStoreListResponse {
    status: number;
    data: IStore[];
    message?: string;
}