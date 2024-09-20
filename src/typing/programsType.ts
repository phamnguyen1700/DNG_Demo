// src/typing/programTypes.ts

export interface IProgram {
    id?: number;
    name: string;
    store_id?: string ;
    program_group_name?: string | null; // Tên nhóm ngành
    type: string; // Cấp bậc (degree, course, etc.)
    certificate_type: string; // Loại bằng
    description?: string | null; // Mô tả
    active: number; // Trạng thái hoạt động (1 hoặc 0)
    created_by: number; // ID người tạo
    created_name: string; // Tên người tạo
    created_avatar: string; // URL ảnh đại diện người tạo
    created_at: string; // Thời gian tạo

    group_id: '';
    level: string;
}

export interface IProgramFormValues {
    name: string;
    store_id?: string;
    type: string;
    certificate_type: string;
    program_group_name?: string | null;
    description?: string | null;
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
    description: string;
    active: number;
    type: string;
    level: string;
    certificate_type: string;
}