// @ts-ignore
import AppLogoPNG from '../../assets/images/logo512.png';
import styled from '@emotion/styled';
import GoogleLoginBtn from './GoogleLoginBtn';
import KakaoLoginBtn from './KakaoLoginBtn';
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import allergyList from '../../assets/constants/allergyList';
import AllergyInfo from './../Recipe/RecipeInfo/AllergyInfo';
import createMember from '../../apis/Login/createMember';
import { Divider } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoReqWrapper = styled.div`
  display: flex;
  height: calc(100vh - 3rem);
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex-shrink: 0;
  padding: 2.5rem 1rem;
`;

const AllergyReqWrapper = styled.div`
  display: flex;
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

const Divider16 = styled.div`
  height: 1rem;
`;

const BeforeLogin = ({ setLoginLevel, setLoginData }) => {
  return (
    <Wrapper>
      <img src={AppLogoPNG} width={256} height={256} />
      <GoogleLoginBtn setLoginData={setLoginData} setLoginLevel={setLoginLevel} />
      <Divider16 />
      <KakaoLoginBtn setLoginData={setLoginData} setLoginLevel={setLoginLevel} />
      <Divider16 />
    </Wrapper>
  );
};

const UserInfoSetting = ({ loginData, setLoginData, setLoginLevel }) => {
  const [name, setName] = useState(loginData.name);
  const [nameError, setNameError] = useState(false);
  const [job, setJob] = useState(loginData.job ?? '');
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

    const newLoginData = { ...loginData };
    newLoginData['job'] = job;
    setLoginData(newLoginData);
    setLoginLevel(2);
  };

  return (
    <>
      <AppBarWithTitle
        title={null}
        rightIcon={null}
        onBackBtnClick={() => setLoginLevel(0)}
        set={null}
      />
      <InfoReqWrapper>
        <WidthFill>
          <Typography variant="h6">기본적인 정보를 확인할게요.</Typography>
        </WidthFill>
        <Divider40 />
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 100, height: 100 }}
        />
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

const UserAllergySetting = ({ loginData, setLoginLevel }) => {
  const [allergies, setAllergies] = useState(allergyList);

  const handleToggle = (index) => () => {
    const newAllergies = [...allergies];

    if (newAllergies[index].checked == 1) newAllergies[index].checked = 0;
    else newAllergies[index].checked = 1;

    setAllergies(newAllergies);
  };

  async function handleClick() {
    const finalLoginData = { ...loginData };
    finalLoginData['allergy'] = getAllergyList();
    console.log(finalLoginData);
    const loggedData = await createMember(finalLoginData);
  }

  function getAllergyList() {
    const allergy = [];
    allergies.map((item) => {
      if (item.checked == 1) allergy.push(item.id);
    });
    return allergy;
  }

  return (
    <>
      <AppBarWithTitle
        title={null}
        rightIcon={null}
        onBackBtnClick={() => setLoginLevel(1)}
        set={null}
      />
      <AllergyReqWrapper>
        <WidthFill>
          <Typography variant="h6">알러지 정보를 선택해주세요.</Typography>
        </WidthFill>
        <Divider40 />
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {allergies.map((item, index) => {
            const labelId = `checkbox-list-secondary-label-${item.id}`;
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={item.checked == 1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding>
                <ListItemButton sx={{ padding: '0.5rem 0' }}>
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={`/assets/images/allergies/${item.imgURL}.png`} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider40 />
        <WidthFill>
          <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={handleClick}>
            <Typography variant="button" fontWeight="bold">
              다음
            </Typography>
          </Button>
        </WidthFill>
        <Divider40 />
      </AllergyReqWrapper>
    </>
  );
};

const Login = () => {
  const [loginLevel, setLoginLevel] = useState(0);
  const [loginData, setLoginData] = useState(null);
  const [body, setBody] = useState(<div></div>);

  useEffect(() => {
    switch (loginLevel) {
      case -1:
        setBody(
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        );
        break;
      case 0:
        setBody(<BeforeLogin setLoginLevel={setLoginLevel} setLoginData={setLoginData} />);
        break;
      case 1:
        setBody(
          <UserInfoSetting
            loginData={loginData}
            setLoginData={setLoginData}
            setLoginLevel={setLoginLevel}
          />
        );
        break;
      case 2:
        setBody(<UserAllergySetting loginData={loginData} setLoginLevel={setLoginLevel} />);
        break;
      default:
        break;
    }
  }, [loginLevel]);

  return body;
};

export default Login;
