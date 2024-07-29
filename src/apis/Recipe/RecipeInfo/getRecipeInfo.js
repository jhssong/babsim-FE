import { baseURL } from '../../api';

/*
레시피 조회 API
{path} : recipeId
@memberID (nullable) (String)
*/
export default async function getRecipeInfo(recipeId) {
  let url = `${baseURL}/recipes/` + recipeId;

  let memberId = 4;
  if (memberId) {
    const queryParams = new URLSearchParams({ memberId });
    url += '?' + queryParams.toString();
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe info');
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
