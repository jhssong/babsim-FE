import styled from '@emotion/styled';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  ShareOutlined,
  DoneOutlined,
  ArrowBackIosOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import logo from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

// Emotion을 이용해 스타일을 적용한 컴포넌트 정의
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;

  width: 100%;
  height: 3rem;

  position: fixed;
  top: 0;

  border-bottom: 1px solid #eeeeee;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

export function AppBarWithLogo() {
  let navigate = useNavigate();

  return (
    <StyledHeader>
      <img src={logo} onClick={() => navigate('/')} />
      <Container>
        <p onClick={() => navigate('/search')}>
          <SearchOutlined />
        </p>
        <p onClick={() => navigate('/cart')}>
          <ShoppingCartOutlined />
        </p>
      </Container>
    </StyledHeader>
  );
}
export function AppBarWithTitle({ title, rightIcon, set }) {
  let navigate = useNavigate();
  return (
    <StyledHeader>
      <p onClick={() => navigate(-1)}>
        <ArrowBackIosOutlined />
      </p>
      <Typography>{title}</Typography>
      {rightIcon === 'share' ? (
        <p onClick={() => set(true)}>
          <ShareOutlined />
        </p>
      ) : rightIcon === 'done' ? (
        <p onClick={() => set(true)}>
          <DoneOutlined />
        </p>
      ) : (
        <></>
      )}
    </StyledHeader>
  );
}
