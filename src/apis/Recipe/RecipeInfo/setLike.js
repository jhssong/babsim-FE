export default async function setLike(recipeId, memberID) {
  let url = `https://localhost:8080/api/likes`;
  const queryParams = new URLSearchParams({ recipeId, memberID });
  url += `?${queryParams.toString()}`;

  console.log(`${url} and working`);
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
