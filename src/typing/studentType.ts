export interface IContact {
    id: number;
    full_name: string;
    type: string; 
    phone: string;
    email: string; 
}

export interface ICourseDetail {
    id: number;
    program_id: number;
    program_name: string;
    course_id: number;
    course_name: string;
    number_session: number;
    start_date_course?: string; 
    class_id?: number; 
    class_name?: string; 
    start_date?: string; 
    end_date?: string; 
    status: string; 
    teacher_name?: string; 
    teacher_avatar?: string;
    teacher_user_id?: number; 
    invoice_course_id: number; 
    payment: number; 
    price: number; 
    total: string; 
    debit: string; 
    transfer_amount_to: number; 
    transfer_amount_from: number; 
}

export interface IStudent {
    id: number;
    profile_code: string; 
    full_name: string; 
    sex: string; 
    birthday: string; 
    phone: string; 
    email?: string; 
    note?: string; 
    province_id: number; 
    province_name: string; 
    district_id: number; 
    district_name: string; 
    ward_id: number; 
    ward_name: string; 
    address?: string; 
    avatar?: string; 
    id_card?: string; 
    date_card?: string; 
    issued_card_id: number; 
    created_at: string; 
    created_by: number; 
    created_name: string; 
    created_avatar: string;
    updated_at: string; 
    updated_by: number;
    sale_user_id: number; 
    phone_full: string;
    contacts: IContact[]; 
    courses: ICourseDetail[]; 
    media: [];
}


export interface IStudentState {
    studentDetail: IStudent | undefined; 
    studentList: IStudent[]; 
    filteredStudentList: IStudent[]; 
    total: number; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
    error?: string; 
}


export interface IPayloadSaveStudent {
    info: {
      id?: number;
      profile_code: string;
      full_name: string;
      sex: string;
      phone: string;
      avatar?: string;
      birthday: string;
      email?: string;
      id_card?: string;
      date_card?: string;
      issued_card_id: number;
      note?: string;
      province_id: number;
      district_id: number;
      ward_id: number;
      address?: string;
    };
    contacts: {
        delete: any[];
        insert: any[];
        update: IContact[];
    };
    courses: ICourseDetail[];
    media: [];
}

export interface IFileUpload {
    file: File;
    type: string;
    folder: string;
    resizelevel: number;
  }
  