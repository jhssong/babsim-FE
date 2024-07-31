import styled from '@emotion/styled';
import { TimerOutlined } from '@mui/icons-material';
import { Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getImageFromStorage } from '../../../apis/firebase/storage';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;

  img {
    width: 210px;
    height: 118px;
    object-fit: contain;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  #timerText {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  width: 100%;

  h6 {
    padding-right: 0.5rem;
  }
  svg {
    padding-right: 0.5rem;
  }
`;

// Timer를 분:초 형식으로 변환하는 함수
const formatTime = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = (timer % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

// Cookery 컴포넌트 정의
export const Cookery = ({ image, desc, timer, order }) => {
  
  return (
    <StyledHeader>
      {image === null ? (
        <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
      ) : (
        <img src={image} alt="Cookery" />
      )}
      <Container>
        <TextContainer>
          <Typography variant="h6">{order}</Typography>
          <Typography variant="body5">{desc ? desc : '설명이 없습니다.'}</Typography>
        </TextContainer>
        <TextContainer id="timerText">
          <TimerOutlined />
          <Typography variant="body5" color="primary">
            {formatTime(timer)}
          </Typography>{' '}
        </TextContainer>
      </Container>
    </StyledHeader>
  );
};

const CookeryContainer = styled.div`
  padding: 1rem;
`;

// CookeryInfo 컴포넌트 정의
const CookeryInfo = ({ imgIds, descs, timers, setRecipeState }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await Promise.all(
          imgIds.map(async (imgId) => {
            return await getImageFromStorage(imgId);
          })
        );
        setImages(imageUrls);
        setRecipeState((prev) => ({ ...prev, images: imageUrls }));
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imgIds !== undefined) loadImages();
  }, [imgIds]);

  if (isLoading) {
    return <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />;
  }

  // images, descs, timers를 하나의 배열로 묶기
  const cookeries = images.map((image, index) => ({
    image,
    desc: descs[index],
    timer: timers[index],
    order: index + 1,
  }));

  return (
    <CookeryContainer>
      {cookeries.map((cookery, index) => (
        <Cookery
          key={index}
          image={cookery.image}
          desc={cookery.desc}
          timer={cookery.timer}
          order={cookery.order}
        />
      ))}
    </CookeryContainer>
  );
};

export default CookeryInfo;
