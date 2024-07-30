import { baseURL } from "../api";

/*
특정 레시피 기준 나의 포크레시피 조회
{path} : recipeId
*/
export default async function getForkedRecipes(memberID, recipeId) {
  let url = `${baseURL}/forked/` + recipeId;
  const queryParams = new URLSearchParams({ memberID });
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
