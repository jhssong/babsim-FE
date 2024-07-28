import { baseURL } from '../../api';

export default async function setLike(recipeId) {
  let url = `${baseURL}/likes`;
  let memberId = 4; // 임시로 4
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
  console.log(responseData);
  return responseData;
}
