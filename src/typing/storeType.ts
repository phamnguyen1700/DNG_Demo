export interface IStore {
    id:  string;
    name: string;
    address: string;
    terminalCode: string | null;
    terminalID: string | null;
    admin_store_id: number;
    learning_session_setting: string[] | null; // nếu muốn làm việc với mảng chuỗi
}


export interface IStoreListResponse {
    status: number;
    data: IStore[];
    message: string;
}