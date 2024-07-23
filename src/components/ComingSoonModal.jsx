import { Modal, Box, Typography } from '@mui/material';

const ComingSoonModal = ({ open, onClose }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: 'background.paper',
    border: '0.1rem solid #FFFFFF',
    borderRadius: '1rem',
    boxShadow: 3,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: 'primary.main' }}>
          Comming Soon
        </Typography>
      </Box>
    </Modal>
  );
};

export default ComingSoonModal;
