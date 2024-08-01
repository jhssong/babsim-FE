import styled from '@emotion/styled';

import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../../apis/Login/logout';
import { isLoggedInState, isTryingToLoginState, userDataState } from '../../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ArrowForwardIosOutlined } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 3rem);
`;

const MyPage = () => {
  const userData = useRecoilValue(userDataState);
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

  const getJobEnum = (job) => {
    switch (job) {
      case 0:
        return 'STUDENT';
      case 1:
        return 'WORKER';
      case 2:
        return 'HOUSEWIFE';
      case 3:
        return 'SENIOR';
      default:
        return 'UNKNOWN';
    }
  };

  return (
    <>
      <AppBarWithTitle />
      <Container>
        <img
          style={{
            borderRadius: '50%',
          }}
          src={userData.img}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
          }}>
          <Info title="이름" body={userData.name} />
          <Info title="이메일" body={userData.email} />
          <Info title="직업" body={getJobEnum(userData.job)} />
          <Info title="잔고" body={`${userData.point ? userData.point : 0} tc`} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '1rem',
            backgroundColor: 'seperator.light',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '1rem',
          }}>
          <Typography variant="h6">거래 내역</Typography>
          <ArrowForwardIosOutlined />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '1rem',
            backgroundColor: 'seperator.light',
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              width: '100%',
            }}
            onClick={handleLogout}>
            <Typography variant="body1">로그아웃</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              width: '100%',
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

const Info = ({ title, body }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0.5rem 0rem',
        justifyContent: 'space-between',
      }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h6" color="primary">
        {body}
      </Typography>
    </Box>
  );
};

export default MyPage;
