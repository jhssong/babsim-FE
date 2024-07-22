import { Rating, Typography, Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import LikeButton from './LikeButton';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 슬라이드 스타일 정의
const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd; // 임시 배경색
`;

// RecipeImageContainer 스타일 정의
const RecipeImageContainer = styled.div`
  width: 100%;
  height: 20%;
  overflow: hidden;

  .slick-slide {
    height: 100%;
  }

  img {
    width: 100%;
    height: 16rem;
    object-fit: cover;
  }
`;

// RecipeInfoImage 컴포넌트
export const RecipeInfoImage = ({ imgs, isLoading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <RecipeImageContainer>
      {isLoading ? (
        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
      ) : (
        <Slider {...settings}>
          {imgs.map((img, idx) => (
            <Slide key={idx}>
              <img src={img} alt={`Recipe image ${idx + 1}`} />
            </Slide>
          ))}
        </Slider>
      )}
    </RecipeImageContainer>
  );
};

// RecipeInformation 스타일 정의
const Container = styled.div`
  width: 100%;
  padding: 1rem;

  h5 {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0.25rem;
  }
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RatingLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

// RecipeInformation 컴포넌트
const RecipeInformation = ({ recipeInfo, isLoading }) => {
  return (
    <Container>
      <TitleLine>
        {isLoading ? (
          <Skeleton variant="text" width={200} height={30} />
        ) : (
          <Typography variant="h5">{recipeInfo.name}</Typography>
        )}
        <LikeButton />
      </TitleLine>
      {isLoading ? (
        <Skeleton variant="text" width="100%" height={20} />
      ) : (
        <Typography variant="body1">{recipeInfo.description}</Typography>
      )}
      <RatingLine>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width={50} height={20} />
            <Skeleton variant="text" width={50} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </>
        ) : (
          <>
            <Rating name="read-only" value={recipeInfo.rate} size="small" readOnly />
            <Typography variant="caption">{recipeInfo.difficulty}</Typography>
            <Typography variant="caption">요리 시간 {recipeInfo.cookingTime}분</Typography>
          </>
        )}
      </RatingLine>
      {isLoading ? (
        <Skeleton variant="text" width="100%" height={20} />
      ) : (
        recipeInfo.tags.map((tag) => (
          <Typography
            variant="caption"
            color="textSecondary"
            key={tag}
            sx={{ paddingRight: '0.25rem' }}>
            #{tag}
          </Typography>
        ))
      )}
    </Container>
  );
};

export default RecipeInformation;
