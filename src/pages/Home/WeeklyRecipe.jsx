import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { HCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getRecipeWeek } from '../../apis/Recipe/getRecipe';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WeeklyRecipeContainer = styled.div`
  display: flex;
  padding: var(--none, 0rem) 1rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const WeeklyRecipeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  margin-bottom: 1rem;
`;

const WeeklyRecipeContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 100%;
`;

const SlideBox = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const WeeklyRecipe = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    const fetchWeeklyRecipe = async () => {
      try {
        const data = await getRecipeWeek();
        setRecipesData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeeklyRecipe();
  }, []);

  const today = new Date();
  const formattedDate = format(today, 'yyyy.MM.dd');

  let navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const groupedRecipes = [];
  for (let i = 0; i < recipesData.length; i += 3) {
    groupedRecipes.push(recipesData.slice(i, i + 3));
  }

  return (
    <WeeklyRecipeContainer>
      <WeeklyRecipeHeader>
        <Typography variant="h5" color="subbackground">
          이번주 레시피
        </Typography>
        <Typography variant="caption" color="subbackground">
          {formattedDate} 기준
        </Typography>
      </WeeklyRecipeHeader>

      <WeeklyRecipeContents>
        <Slider {...settings} style={{ width: '100%', height: '100%' }}>
          {groupedRecipes.map((recipeGroup, groupIndex) => (
            <SlideBox key={groupIndex}>
              {recipeGroup.map((recipe, index) => (
                <HCard
                  key={recipe.id}
                  recipe={recipe}
                  index={groupIndex * 3 + index}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
              ))}
            </SlideBox>
          ))}
        </Slider>
      </WeeklyRecipeContents>
    </WeeklyRecipeContainer>
  );
};

export default WeeklyRecipe;
