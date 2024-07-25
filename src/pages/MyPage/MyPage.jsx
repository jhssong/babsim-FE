import styled from '@emotion/styled';

import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../../apis/Login/logout';
import { isLoggedInState, isTryingToLoginState, userDataState } from '../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
  const setIsTryingToLogin = useSetRecoilState(isTryingToLoginState);
  const setUserData = useSetRecoilState(userDataState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleLogout = async () => {
    setIsTryingToLogin(true);
    const status = await logout();
    if (status) {
      setMessage('로그아웃되었습니다');
      setOpen(true);
      navigate('/');
      setUserData(null);
      setIsTryingToLogin(false);
      setIsLoggedIn(false);
    } else {
      setMessage('로그아웃에 실패하였습니다');
      setOpen(true);
    }
  };

  const handleUnregister = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setMessage('탈퇴되었습니다');
    setOpen(true);
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
            onClick={handleLogout}>
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
            onClick={handleUnregister}>
            <Typography variant="body1">탈퇴하기</Typography>
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
