import styled from '@emotion/styled';

import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, [navigate]);

  return (
    <>
      <Container>
        <Typography variant="h3" color="primary">
          404 Not Found
        </Typography>
      </Container>
    </>
  );
};

export default NotFound;
