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
    store_id: string; // Thêm thuộc tính store_id để lọc theo chi nhánh
    store_name: string;
    program_type: string; // Thêm thuộc tính program_type để lọc theo chương trình
    program_name: string;
}

export interface CourseState {
    courseList: ICourse[];
    filteredCourseList: ICourse[]; // Danh sách đã lọc
    total: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}



