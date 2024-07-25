export default async function setLike(recipeId, memberID) {
  let url = `https://localhost:8080/api/likes`;
  const queryParams = new URLSearchParams({ recipeId, memberID });
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
