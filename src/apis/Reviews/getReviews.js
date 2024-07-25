/*
레시피 리뷰 조회 API
{path} : recipeId
*/
export default async function getReviews(recipeId) {
  const url = `https://localhost:8080/api/reviews/${recipeId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get reviews');
  const responseData = await response.json();
  return responseData;
}
