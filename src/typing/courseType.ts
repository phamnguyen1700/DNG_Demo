// src/typing/courseTypes.ts

export interface ICourse {
    id: number;
    name: string;
    number_session: number;
    active: number;
    created_by: number;
    created_at: string;
    created_name: string;
    created_avatar: string;
    store_id?: string; // Thêm thuộc tính store_id để lọc theo chi nhánh
    store_name: string;
    program_type: string; // Thêm thuộc tính program_type để lọc theo chương trình
    program_name: string;
    program_id: string;
    price: number;
    description: string;
    elementary_settings: { id: number, coefficient: number }[];
    training_settings: [];
}

export interface CourseState {
    courseList: ICourse[];
    filteredCourseList: ICourse[]; // Danh sách đã lọc
    total: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export interface IPayloadSaveCourse {
    id?: number;
    name: string;
    program_id: number;
    store_id: number;
    price: number;
    number_session: number;
    description: string;
    active: number;
    elementary_settings: { id: number, coefficient: number }[];
    training_settings: [];
}


