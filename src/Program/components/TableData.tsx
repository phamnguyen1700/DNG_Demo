// src/program/components/TableData.tsx
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
import { Program } from '../../typing/programsType';
import { useDispatch } from 'react-redux';
// import { tongleProgramStatus } from '../../redux/actions/programActions';
import { AppDispatch } from '../../redux/store';


interface TableDataProps {
  programs: Program[];
  total: number;
  page: number;
  rowsPerPage: number;
  onEdit: (program: Program) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableData: React.FC<TableDataProps> = ({
  programs,
  total,
  page,
  rowsPerPage,
  onEdit,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // const handleTongleStatus = (program: Program) => {
  //   const newStatus = program.active === 1 ? '0' : '1';
  //   dispatch(tongleProgramStatus({ id: program.id.toString(), status: newStatus }));
  // }
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
          {programs.map((program) => (
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
                  // onChange={() => handleTongleStatus(program)}
                  />
              </TableCell>
              <TableCell>
                <Tooltip title={`ID: ${program.created_by} - ${program.created_name}`}>
                  <Avatar alt={program.created_name} src={program.created_avatar} />
                </Tooltip>
                <div>{program.created_at}</div>
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
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default TableData;
