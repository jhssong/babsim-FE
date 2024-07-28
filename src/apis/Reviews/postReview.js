/*
리뷰 작성 API
@recipeId(Long)
@memberId(String)
*/
export default async function postReview({ recipeId, rating, comment, forkedRecipeId }) {
  let url = `http://localhost:8080/api/reviews`;
  let memberId = 4;
  const queryParams = new URLSearchParams({ recipeId, memberId });
  url += `?${queryParams.toString()}`;

  console.log(`forkedRecipeId is ${forkedRecipeId}`);

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
