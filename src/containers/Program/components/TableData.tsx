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
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/store';

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

  const { stores } = useSelector((state: IRootState) => state.store);


  
  const handlePageChange = (event: unknown, newPage: number) => {
    onPageChange(newPage); 
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
          {programs?.map((program) => {
            const store = stores?.find((i)=> i.id === program.store_id);
            return (
            <TableRow key={program.id}>
              <TableCell>{program.id}</TableCell>
              <TableCell>{program.name}</TableCell>
              <TableCell>{store?.name}</TableCell>
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
                  sx={{ width: 48, height: 48, margin: '0 auto' }} 
                  />
                </Tooltip>
                <div
                    style={{
                      textAlign: 'center', 
                      marginTop: '8px', 
                      fontSize: '16px', 
                      color: 'gray', 
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
            )
        })}
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
