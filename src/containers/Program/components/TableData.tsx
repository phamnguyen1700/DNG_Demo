import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  Switch,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { IProgram } from '../../../typing/programsType';

interface TableDataProps {
  programs: IProgram[];
  total: number;
  limit: number; 
  offset: number;
  onEdit: (program: IProgram) => void;
  onPageChange: (newPage: number) => void; 
}

const TableData: React.FC<TableDataProps> = ({
  programs,
  total,
  limit,
  offset,
  onEdit,
  onPageChange,
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
            <TableCell>Tên chương trình</TableCell>
            <TableCell>Chi nhánh</TableCell>
            <TableCell>Nhóm ngành</TableCell>
            <TableCell>Cấp bậc</TableCell>
            <TableCell>Loại bằng</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Người tạo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programs?.map((program) => (
            <TableRow key={program.id}>
              <TableCell>{program.id}</TableCell>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.store_id}</TableCell>
              <TableCell>{program.program_group_name}</TableCell>
              <TableCell>{program.type}</TableCell>
              <TableCell>{program.certificate_type}</TableCell>
              <TableCell>{program.description}</TableCell>
              <TableCell>
                <Switch
                  checked={program.active === 1}
                />
              </TableCell>
              <TableCell>
                <Tooltip title={`ID: ${program.created_by} - ${program.created_name}`}>
                  <Avatar
                  alt={program.created_name}
                  src={program.created_avatar}
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
                  {program.created_at}
                </div>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(program)}>
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
        page={offset / limit}
        onPageChange={handlePageChange} 
        rowsPerPage={limit}
      />
    </TableContainer>
  );
};

export default TableData;
