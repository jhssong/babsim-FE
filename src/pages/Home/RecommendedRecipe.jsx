import { VCard } from '../../components/Card';
import { GridCardList } from '../../components/CardList';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeRecommend } from '../../apis/Recipe/getRecipe';
import Loading from '../../components/Loading';

const RecommendedRecipe = () => {
  const user = useRecoilValue(userDataState);
  let navigate = useNavigate();

  const [recipesData, setRecipesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRecommendedRecipe = async (userId) => {
      try {
        const data = await getRecipeRecommend(userId);
        setRecipesData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRecommendedRecipe(1);
  }, []);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <GridCardList title={`${user.name}님을 위한 추천 레시피`}>
      {recipesData.map((recipe, index) => (
        <VCard
          key={recipe.id}
          product={recipe}
          index={index}
          type="recipe"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        />
      ))}
    </GridCardList>
  );
};

export default RecommendedRecipe;
