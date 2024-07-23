import { useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import styled from '@emotion/styled';
import { Avatar, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/atoms';

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
  const [loginData, setLoginData] = useRecoilState(loginState);
  const [name, setName] = useState(loginData.user.name);
  const [nameError, setNameError] = useState(false);
  const [job, setJob] = useState(loginData.user.job ?? '');
  const [jobError, setJobError] = useState(false);

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
    const newLoginData = {
      ...loginData,
      user: {
        ...loginData.user,
        job: job,
      },
    };
    setLoginData(newLoginData);
    navigate('/login/allergySetting');
  };

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
        <Avatar alt="Remy Sharp" src={loginData.user.img} sx={{ width: 100, height: 100 }} />
        <Divider40 />
        <TextField
          id="memberName"
          label="이름"
          sx={{ width: '100%' }}
          onChange={handleName}
          defaultValue={name}
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
