import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ModalConfirmProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ show, title, message, onConfirm, onClose }) => {
  return (
    <Modal open={show} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Box display="flex" justifyContent="flex-end" marginTop="20px">
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginRight: '10px' }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
