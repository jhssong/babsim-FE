import { baseURL } from '../../api';

export default async function setLike(recipeId, memberId) {
  let url = `${baseURL}/likes`;
  const queryParams = new URLSearchParams({ recipeId, memberId });
  url += `?${queryParams.toString()}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to like the recipe');
  const responseData = await response.json();
  return responseData;
}
