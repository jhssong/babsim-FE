import { baseURL } from '../api';

/*
레시피 리뷰 조회 API
{path} : recipeId
*/
export default async function getReviews(recipeId) {
  const url = `${baseURL}/reviews/` + recipeId;

  console.log(`getReviews : ${url} and working`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to get reviews');
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
