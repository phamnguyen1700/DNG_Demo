import { paths } from '../route/path';


interface MenuItem {
  id: number;
  name: string;
  url?: string;
  children?: MenuItem[];
}

// Đảm bảo rằng menuConfig có kiểu MenuItem[]
export const menuConfig: MenuItem[] = [
  {
      id: 1,
      name: 'Thiết lập danh mục',
      url: '/danh-muc',
      children: [
          { id: 2, name: 'Chương trình đào tạo', url: paths.program.list },
          { id: 3, name: 'Khóa học', url: paths.course.list },
      ],
  },
];
