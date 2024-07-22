import styled from '@emotion/styled';

import { AppBarWithTitle } from '../../components/AppBar';
import { Box, Button, Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7rem);
`;

const Cart = () => {
  return (
    <>
      <AppBarWithTitle title="장바구니" />
      <Container>
        <Typography variant="body1">장바구니에 든게 없어용...</Typography>
      </Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '1rem',
        }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.light',
            width: '100%',
            height: '100%',
          }}>
          <Typography variant="body1">구매하기</Typography>
        </Button>
      </Box>
    </>
  );
};

export default Cart;
