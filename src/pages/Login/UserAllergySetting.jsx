import { useState } from 'react';
import allergyList from '../../assets/constants/allergyList';
import createMember from '../../apis/Login/createMember';
import styled from '@emotion/styled';
import { AppBarWithTitle } from '../../components/AppBar';
import {
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

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

const UserAllergySetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginData } = location.state || {};
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
    navigate('/', { replace: true });
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
        onBackBtnClick={() => {
          navigate(-1);
        }}
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

export default UserAllergySetting;
