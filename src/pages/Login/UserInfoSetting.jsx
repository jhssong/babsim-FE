/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import styled from '@emotion/styled';
import { Avatar, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, userDataState } from '../../recoil/atoms';

const InfoReqWrapper = styled.div`
  display: flex;
  height: calc(100vh - 3rem);
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-shrink: 0;
  padding: 2.5rem 1rem;
`;

const WidthFill = styled.div`
  display: flex;
  width: 100%;
`;

const Divider40 = styled.div`
  height: 2.5rem;
`;

const UserInfoSetting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [job, setJob] = useState('');
  const [jobError, setJobError] = useState(false);
  const [userData, setUserData] = useRecoilState(userDataState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const handleName = (event) => {
    setNameError(event.target.value == null);
    setName(event.target.value);
  };

  const handleJob = (event) => {
    setJobError(event.target.value == '');
    setJob(event.target.value);
  };

  const handleClick = () => {
    if (name == '') {
      setNameError(true);
      return;
    }
    if (typeof job != 'number') {
      setJobError(true);
      return;
    }

    setUserData({ ...userData, job: job });
    navigate('/login/allergySetting');
  };

  useEffect(() => {
    if (userData == null) {
      alert('잘못된 접근입니다.');
      navigate('/login');
    } else if (isLoggedIn) {
      alert('이미 로그인되었습니다.');
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setName(userData.name);
  }, [userData]);

  return (
    <>
      <AppBarWithTitle
        title={null}
        rightIcon={null}
        onBackBtnClick={() => {
          navigate(-1);
        }}
        set={null}
      />
      <InfoReqWrapper>
        <WidthFill>
          <Typography variant="h6">기본적인 정보를 확인할게요.</Typography>
        </WidthFill>
        <Divider40 />
        <Avatar alt="Remy Sharp" src={userData.img} sx={{ width: 100, height: 100 }} />
        <Divider40 />
        <TextField
          id="memberName"
          label="이름"
          sx={{ width: '100%' }}
          onChange={handleName}
          defaultValue={userData.name}
          inputProps={{ maxLength: 20 }}
          error={nameError}
          helperText={nameError ? '이름을 입력해주세요' : ''}
        />
        <Divider40 />
        <WidthFill>
          <TextField
            value={job}
            onChange={handleJob}
            select
            label="직업"
            sx={{ width: '100%' }}
            error={jobError}
            helperText={jobError ? '직업을 선택해주세요' : ''}>
            <MenuItem value={1}>학생</MenuItem>
            <MenuItem value={2}>직장인</MenuItem>
            <MenuItem value={3}>주부</MenuItem>
          </TextField>
        </WidthFill>
        <Divider40 />
        <WidthFill>
          <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleClick}>
            <Typography variant="button" fontWeight="bold">
              다음
            </Typography>
          </Button>
        </WidthFill>
      </InfoReqWrapper>
    </>
  );
};

export default UserInfoSetting;
