import { baseURL } from '../api';

export default async function putCook({ recipeId }) {
  let url = `${baseURL}/cookedRecord`;
  const queryParams = new URLSearchParams({ recipeId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to post a cook record');
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
