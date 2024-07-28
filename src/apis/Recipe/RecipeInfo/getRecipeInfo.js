import { baseURL } from '../../api';

/*
레시피 조회 API
{path} : recipeId
@memberID (nullable) (String)
*/
export default async function getRecipeInfo(recipeId, memberID) {
  let url = `${baseURL}/recipes/${recipeId}`;

  // Query Parameter를 추가 (memberID가 있는 경우에만)
  if (memberID) {
    const queryParams = new URLSearchParams({ memberID });
    url += `?${queryParams.toString()}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe info');
  const responseData = await response.json();
  return responseData;
}
