import { baseURL } from '../../api';

/*
레시피 작성 API
@creatorId(String) 작성자 ID
*/
export default async function postRecipeWrite({ recipeInfo, creatorId }) {
  let url = `${baseURL}/recipes`;
  const queryParams = new URLSearchParams({ creatorId });
  url += `?${queryParams.toString()}`;

  // 카테고리 ID 매핑
  const categoryMapping = {
    'Main Courses': 1,
    Simple: 2,
    Vegan: 3,
    Snack: 4,
    Baking: 5,
    Diet: 6,
    Oven: 7,
    Keto: 8,
  };
  const categoryId = categoryMapping[recipeInfo.categoryName] || 1;

  // 재료 정보 매핑
  const ingredients = recipeInfo.ingredients.map((ingredient) => {
    return {
      name: ingredient.name,
      amount: ingredient.quantity,
    };
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipeImgs: recipeInfo.recipeImgs,
      name: recipeInfo.name,
      description: recipeInfo.description,
      difficulty: recipeInfo.difficulty,
      cookingTime: recipeInfo.cookingTime,
      categoryId: categoryId,
      tags: recipeInfo.tags,
      ingredients: ingredients,
      recipeContents: recipeInfo.recipeContents,
      recipeDetailImgs: recipeInfo.recipeDetailImgs,
      timers: recipeInfo.recipeTimers,
    }),
  });
  if (!response.ok) throw new Error('Failed to post new recipe');
  const responseData = await response.json();
  return responseData;
}
