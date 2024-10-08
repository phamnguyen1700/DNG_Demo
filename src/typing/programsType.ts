
export interface IProgram {
    id: number;
    name: string;
    store_id?: number ;
    program_group_name?: string; // Tên nhóm ngành
    type: string; // Cấp bậc (degree, course, etc.)
    certificate_type: string; // Loại bằng
    description?: string ; // Mô tả
    active: number; // Trạng thái hoạt động (1 hoặc 0)
    created_by: number; // ID người tạo
    created_name: string; // Tên người tạo
    created_avatar: string; // URL ảnh đại diện người tạo
    created_at: string; // Thời gian tạo

    group_id: number;
    level: string;
}


export interface IProgramState {
    programList: IProgram[]; // Danh sách các chương trình
    filteredProgramList: IProgram[]; // Danh sách đã lọc
    total: number; // Tổng số chương trình
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Trạng thái
    error?: string; // Lỗi nếu có
}

export interface IPayloadSaveProgram{
    id?: number;
    name: string;
    store_id: number;
    group_id: number;
    description?: string;
    active: number;
    type: string;
    level: string;
    certificate_type: string;
}


export interface IProgramValidation {
    name: string;
    store_id: number;
    group_id: number;
    description?: string;
    type: string;
    level: string;
    certificate_type: string;
}