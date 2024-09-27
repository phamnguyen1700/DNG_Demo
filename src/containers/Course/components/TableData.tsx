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
import { ICourse } from '../../../typing/courseType';


interface TableDataProps {
  courses: ICourse[];
  total: number;
  limit: number; 
  offset: number;
  onEdit: (course: ICourse) => void;
  onPageChange: (newPage: number) => void; 
  onToggleStatus: (course: ICourse) => void;
}

const TableData: React.FC<TableDataProps> = ({
  courses,
  total,
  limit,
  offset,
  onEdit,
  onPageChange,
  onToggleStatus,
}) => {
    // Hàm xử lý thay đổi trang (khi người dùng chuyển trang)
    const handlePageChange = (event: unknown, newPage: number) => {
      onPageChange(newPage); // Cập nhật offset
    };

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
              <TableCell>
                {/* <div
                  style={{
                    textAlign: 'center',
                  }}
                > */}
                  {course.number_session}
                {/* </div> */}
              </TableCell>
              <TableCell>
                <Switch 
                  checked={course.active === 1}  
                  onChange={() => onToggleStatus(course)}                
                />
              </TableCell>
              <TableCell>
                <Tooltip title={`ID: ${course.created_by} - ${course.created_name}`}>
                  <Avatar 
                  alt={course.created_name} 
                  src={course.created_avatar} 
                  sx={{ width: 48, height: 48, margin: '0 auto' }} // Canh giữa Avatar
                />
                </Tooltip>
                <div
                  style={{
                    textAlign: 'center', // Căn giữa text
                    marginTop: '8px', // Khoảng cách giữa Avatar và ngày tạo
                    fontSize: '16px', // Kích thước chữ nhỏ hơn
                    color: 'gray', // Màu chữ nhạt hơn
                  }}
                >
                  {course.created_at}
                  </div>
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
        page={Math.floor(offset / limit)} //trả về newPage
        onPageChange={handlePageChange}
        rowsPerPage={limit}
      />
    </TableContainer>
  );
};

export default TableData;
