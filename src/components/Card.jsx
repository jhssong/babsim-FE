import styled from '@emotion/styled';

import { Star, AccessTime } from '@mui/icons-material';
import { Typography } from '@mui/material';

const RecipeContiner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  flex: 1;
`;

const Recipe = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  gap: 1rem;
`;

const RecipeImage = styled.img`
  width: 30%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const RecipeInfo = styled.div`
  display: flex;
  padding: var(--none, 0rem) 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  align-self: stretch;
  gap: 0.5rem;
  height: 100%;
`;

const HashTags = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  max-width: 100%;
`;

const TimeAndRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HCard = ({ recipe, index, onClick }) => {
  const formatCookingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    }
    return `${remainingMinutes}분`;
  };

  return (
    <RecipeContiner>
      <Typography variant="h6">{index + 1}</Typography>
      <Recipe onClick={onClick}>
        <RecipeImage src={recipe.img} alt={recipe.recipeName} />
        <RecipeInfo>
          <HashTags>
            {recipe.tags.map((tag, idx) => (
              <Typography key={idx} variant="caption" sx={{ color: 'subbackground.main' }}>
                #{tag}
              </Typography>
            ))}
          </HashTags>
          <Typography variant="body1">{recipe.recipeName}</Typography>
          <TimeAndRating>
            <Time>
              <AccessTime />
              <Typography variant="body2">{formatCookingTime(recipe.cookingTime)}</Typography>
            </Time>
            <Rating>
              <Star sx={{ color: 'primary.main' }} />
              <Typography variant="body2" sx={{ color: 'subbackground.main' }}>
                {recipe.rate}
              </Typography>
            </Rating>
          </TimeAndRating>
        </RecipeInfo>
      </Recipe>
    </RecipeContiner>
  );
};

const ProdcutContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const ProductInfo = styled.div`
  display: flex;
  padding: 0.5rem 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
`;
export const VCard = ({ type, product, index, style, onClick }) => {
  return (
    <ProdcutContainer style={style} onClick={onClick}>
      <ProductImage src={product.img} alt={product.name} />
      <ProductInfo>
        {type === 'recipe' ? (
          <HashTags>
            {product.tags.map((tag, idx) => (
              <Typography key={idx} variant="caption" sx={{ color: 'subbackground.main' }}>
                #{tag}
              </Typography>
            ))}
          </HashTags>
        ) : (
          <></>
        )}
        <Typography variant="body1">
          {type === 'recipe' ? product.recipeName : product.name}
        </Typography>
        {type !== 'recipe' ? <Typography variant="body2">{product.price}</Typography> : <></>}
        {type !== 'nft' ? (
          <Rating>
            <Star color="primary" fontSize="small" />
            <Typography variant="body2" sx={{ color: 'subbackground.main' }}>
              {product.rate}
            </Typography>
          </Rating>
        ) : (
          <></>
        )}
      </ProductInfo>
    </ProdcutContainer>
  );
};
