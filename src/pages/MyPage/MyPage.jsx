import styled from '@emotion/styled';

import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7rem);
`;

const MyPage = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate(-1);
  };

  return (
    <>
      <AppBarWithTitle />
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
          }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              width: '100%',
              height: '100%',
            }}
            onClick={() => {
              setMessage('로그아웃되었습니다.');
              setOpen(true);
            }}>
            <Typography variant="body1">로그아웃</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',

            padding: '1rem',
          }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              width: '100%',
              height: '100%',
            }}
            onClick={() => {
              setMessage('탈퇴되었습니다.');
              setOpen(true);
            }}>
            <Typography variant="body1">탍퇴하기</Typography>
          </Button>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={800}
        onClose={handleSnackbarClose}
        message={message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default MyPage;
