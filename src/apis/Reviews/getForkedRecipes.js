import { baseURL } from "../api";

/*
특정 레시피 기준 나의 포크레시피 조회
{path} : forkedRecipeId
@id : 사용자 id
*/
export default async function getForkedRecipes({ memberId, forkedRecipeId }) {
  let url = `${baseURL}/recipes/forked/` + forkedRecipeId;
  const queryParams = new URLSearchParams({ memberId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get forked recipes');
  const responseData = await response.json();
  return responseData;
}
