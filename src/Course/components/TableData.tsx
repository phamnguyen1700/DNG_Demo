// src/course/components/TableData.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  //tooltip hiển thị thông tin khi hover vào 1 phần tử
  Tooltip,
  Switch,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ICourse } from '../../typing/courseType';


interface TableDataProps {
  courses: ICourse[];
  total: number;
  page: number;
  rowsPerPage: number;
  onEdit: (course: ICourse) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleStatus: (course: ICourse) => void;
}

const TableData: React.FC<TableDataProps> = ({
  courses,
  total,
  page,
  rowsPerPage,
  onEdit,
  onPageChange,
  onRowsPerPageChange,
  onToggleStatus,
}) => {
  // const dispatch = useDispatch<AppDispatch>();

  // const handleToggleStatus = (course: ICourse) => {
  //   const newStatus = course.active === 1 ? 0 : 1;
  //   dispatch(toggleCourseStatus({ id: course.id, active: newStatus }));
  // }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên khóa</TableCell>
            <TableCell>Chi nhánh & Ngành</TableCell>
            <TableCell>Số buổi học</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Người tạo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>
                {course.store_name} & {course.program_name}
              </TableCell>
              <TableCell>{course.number_session}</TableCell>
              <TableCell>
                <Switch 
                  checked={course.active === 1}  
                  onChange={() => onToggleStatus(course)}                
                />
              </TableCell>
              <TableCell>
                <Tooltip title={`ID: ${course.created_by} - ${course.created_name}`}>
                  <Avatar alt={course.created_name} src={course.created_avatar} />
                </Tooltip>
                <div>{course.created_at}</div>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(course)}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
      />
    </TableContainer>
  );
};

export default TableData;
