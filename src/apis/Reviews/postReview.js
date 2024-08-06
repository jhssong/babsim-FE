import { baseURL } from '../api';

/*
리뷰 작성 API
@recipeId(Long)
@memberId(String)
*/
export default async function postReview({ recipeId, memberId, rating, comment, forkRecipeId }) {
  let url = `${baseURL}/reviews`;
  const queryParams = new URLSearchParams({ recipeId, memberId });
  url += `?${queryParams.toString()}`;

  console.log(`forkRecipeId is ${forkRecipeId}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rating: rating,
      comment: comment,
      forkRecipeId: forkRecipeId,
    }),
  });
  if (!response.ok) throw new Error('Failed to post review');
  const responseData = await response.json();
  return responseData;
}
