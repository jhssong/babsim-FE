import React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import allergyList from '../../../assets/constants/allergyList';

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AllergyInfo = ({ allergys }) => {
  return (
    <Container>
      <Typography variant="h5">알레르기 정보</Typography>
      <ImageContainer>
        {allergys.map((allergy, index) => (
          <ImageItem key={index}>
            <img
              src={`/assets/images/allergies/${allergyList[allergy - 1].imgURL}.png`}
              alt={allergyList[allergy - 1].name}
              style={{ width: '3rem', height: '3rem', objectFit: 'contain' }}
            />
            <Typography variant="body2">{allergyList[allergy - 1].name}</Typography>
          </ImageItem>
        ))}
      </ImageContainer>
    </Container>
  );
};

export default AllergyInfo;
