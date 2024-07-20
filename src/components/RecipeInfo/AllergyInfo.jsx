import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

const AllergyInfo = ({ allergys }) => {
  return (
    <>
      <Container>
        <Typography variant="h5">알레르기 정보</Typography>
        {allergys.map((allergy, index) => (
          <Typography key={index} variant="body1">
            {allergy}
          </Typography>
        ))}
      </Container>
    </>
  );
};

export default AllergyInfo;
