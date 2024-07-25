/*
리뷰 작성 API
@recipeId(Long)
@memberId(String)
*/
export default async function postReview({ recipeId, memberID, rating, comment, forkedRecipeId }) {
  let url = `https://localhost:8080/api/reviews`;
  const queryParams = new URLSearchParams({ recipeId, memberID });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rating: rating,
      comment: comment,
      forkedRecipeId: forkedRecipeId,
    }),
  });
  if (!response.ok) throw new Error('Failed to post review');
  const responseData = await response.json();
  return responseData;
}
