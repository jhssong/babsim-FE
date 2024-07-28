import styled from '@emotion/styled';

import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { HCard } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getRecipeWeek } from '../../apis/Recipe/getRecipe';

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
`;

const WeeklyRecipeContents = styled.div`
  display: flex;
  padding: 0.5rem var(--none, 0rem);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

const WeeklyRecipe = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipesToShow, setRecipesToShow] = useState([]);
  useEffect(() => {
    const fetchWeeklyRecipe = async () => {
      try {
        const data = await getRecipeWeek();
        setLoading(false);
        setRecipesToShow(data.slice(pageIndex * 3, pageIndex * 3 + 3));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeeklyRecipe();
  }, []);

  const today = new Date();
  const formattedDate = format(today, 'yyyy.MM.dd');

  const [pageIndex, setPageIndex] = useState(0); //페이지를 나타내는 변수
  let navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => setPageIndex((prevIndex) => Math.min(prevIndex + 1, 4)), // 최대 페이지 인덱스는 4 (0부터 시작해서 5페이지)
    onSwipedRight: () => setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0)),
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <WeeklyRecipeContainer>
        <WeeklyRecipeHeader>
          <Typography variant="h5" color="subbackground">
            이번주 레시피
          </Typography>
          <Typography variant="caption" color="subbackground">
            {formattedDate} 기준
          </Typography>
        </WeeklyRecipeHeader>

        <WeeklyRecipeContents {...handlers}>
          {recipesToShow.map((recipe, index) => (
            <HCard
              key={recipe.id}
              recipe={recipe}
              index={pageIndex * 3 + index}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </WeeklyRecipeContents>
      </WeeklyRecipeContainer>
    </>
  );
};

export default WeeklyRecipe;
