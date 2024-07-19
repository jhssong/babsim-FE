import styled from '@emotion/styled';
import { SearchOutlined, ShoppingCartOutlined, ShareOutlined, DoneOutlined, ArrowBackIosOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import logo from '../assets/images/logo.svg';

// Emotion을 이용해 스타일을 적용한 컴포넌트 정의
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 1rem;

  width: 100%;
  height: 3rem;

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
  return (
    <StyledHeader>
      <img src={logo} />
      <Container>
        <p onClick={() => {}}>
          <SearchOutlined />
        </p>
        <p onClick={() => {}}>
          <ShoppingCartOutlined />
        </p>
      </Container>
    </StyledHeader>
  );
}
export function AppBarWithTitle({ title, righticon }) {
  return (
    <StyledHeader>
      <ArrowBackIosOutlined />
      <Typography>{title}</Typography>
      {righticon === 'share' ? <ShareOutlined /> : righticon === 'done' ? <DoneOutlined /> : <></>}
    </StyledHeader>
  );
}
