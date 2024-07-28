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

  // const recipesData = {
  //   list: [
  //     {
  //       id: '0',
  //       img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
  //       name: 'Spaghetti Carbonara',
  //       tags: ['Italian', 'Pasta', 'Creamy'],
  //       cookingTime: 1800,
  //       rate: 4.5,
  //       allergies: ['dairy', 'egg'],
  //     },
  //     {
  //       id: '0',
  //       img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
  //       name: 'Chicken Curry',
  //       tags: ['Indian', 'Spicy', 'Chicken'],
  //       cookingTime: 2400,
  //       rate: 4.7,
  //       allergies: ['nut'],
  //     },
  //     {
  //       id: '0',
  //       img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
  //       name: '조재용의 특제 시부야 초록라멘 국물이 아주 끝내줘요 아주 그냥 ',
  //       tags: ['Vegan', 'Healthy', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl', 'Bowl'],
  //       cookingTime: 1500,
  //       rate: 4.9,
  //       allergies: ['soy', 'sesame'],
  //     },
  //     {
  //       id: '0',
  //       img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
  //       name: 'Beef Tacos',
  //       tags: ['Mexican', 'Beef', 'Spicy'],
  //       cookingTime: 1200,
  //       rate: 4.3,
  //       allergies: ['gluten'],
  //     },
  //     {
  //       id: '0',
  //       img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
  //       name: 'Beef Tacos',
  //       tags: ['Mexican', 'Beef', 'Spicy'],
  //       cookingTime: 1200,
  //       rate: 4.3,
  //       allergies: ['gluten'],
  //     },
  //   ],
  // };

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
