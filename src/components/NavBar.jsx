import styled from '@emotion/styled';
import {
  AssignmentOutlined,
  BookmarkBorderOutlined,
  HomeOutlined,
  AccountCircleOutlined,
  StorefrontOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 4.47938rem;
  justify-content: center;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const NavBar = ({ page }) => {
  let navigate = useNavigate();

  return (
    <>
      <Container>
        <Wrapper onClick={() => navigate('recipe')}>
          <AssignmentOutlined color={page === 'recipe' ? 'primary' : 'inherit'} />
          <Typography variant="caption" color={page === 'recipe' ? 'primary' : 'inherit'}>
            레시피
          </Typography>
        </Wrapper>
        <Wrapper onClick={() => navigate('scrap')}>
          <BookmarkBorderOutlined color={page === 'scrap' ? 'primary' : 'inherit'} />
          <Typography variant="caption" color={page === 'scrap' ? 'primary' : 'inherit'}>
            스크랩
          </Typography>
        </Wrapper>
        <Wrapper onClick={() => navigate('home')}>
          <HomeOutlined color={page === 'home' ? 'primary' : 'inherit'} />
          <Typography variant="caption" color={page === 'home' ? 'primary' : 'inherit'}>
            홈
          </Typography>
        </Wrapper>
        <Wrapper onClick={() => navigate('market')}>
          <StorefrontOutlined color={page === 'market' ? 'primary' : 'inherit'} />
          <Typography variant="caption" color={page === 'market' ? 'primary' : 'inherit'}>
            마켓
          </Typography>
        </Wrapper>
        <Wrapper onClick={() => navigate('mypage')}>
          <AccountCircleOutlined color={page === 'mypage' ? 'primary' : 'inherit'} />
          <Typography variant="caption" color={page === 'mypage' ? 'primary' : 'inherit'}>
            마이페이지
          </Typography>
        </Wrapper>
      </Container>
    </>
  );
};

export default NavBar;
