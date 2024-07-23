import styled from '@emotion/styled';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  ShareOutlined,
  DoneOutlined,
  ArrowBackIosOutlined,
  ArrowForwardOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import logo from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

// Emotion을 이용해 스타일을 적용한 컴포넌트 정의
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; // 수직 중앙 정렬
  padding: 0.625rem 1rem;
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #eeeeee;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center; // 수직 중앙 정렬
  gap: 0.25rem;
`;

const IconWrapper = styled.p`
  display: flex;
  align-items: center; // 수직 중앙 정렬
  margin: 0;
  cursor: pointer;
`;

export function AppBarWithLogo() {
  let navigate = useNavigate();

  return (
    <StyledHeader>
      <img src={logo} onClick={() => navigate('/')} />
      <Container>
        <IconWrapper onClick={() => navigate('/search')}>
          <SearchOutlined />
        </IconWrapper>
        <IconWrapper onClick={() => navigate('/cart')}>
          <ShoppingCartOutlined />
        </IconWrapper>
      </Container>
    </StyledHeader>
  );
}

export function AppBarWithTitle({ title, rightIcon, onRightIconClick, onBackBtnClick }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackBtnClick === undefined) {
      navigate(-1);
    } else {
      onBackBtnClick(false);
    }
  };

  const BuildRightIcon = ({ rightIcon }) => {
    switch (rightIcon) {
      case 'share':
        return (
          <IconWrapper onClick={() => set(true)}>
            <ShareOutlined />
          </IconWrapper>
        );
      case 'done':
        return (
          <IconWrapper onClick={() => set(true)}>
            <DoneOutlined />
          </IconWrapper>
        );
      case 'doneInCookeryEditModal':
        return (
          <IconWrapper onClick={onRightIconClick}>
            <DoneOutlined />
          </IconWrapper>
        );
      case 'next':
        return (
          <IconWrapper onClick={() => set(true)}>
            <ArrowForwardOutlined />
          </IconWrapper>
        );
      default:
        return <div style={{ width: '24px' }} />;
    }
  };

  return (
    <StyledHeader>
      <IconWrapper onClick={handleBackClick}>
        <ArrowBackIosOutlined />
      </IconWrapper>
      <Typography>{title}</Typography>
      <BuildRightIcon rightIcon={rightIcon} />
    </StyledHeader>
  );
}