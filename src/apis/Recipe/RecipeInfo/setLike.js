export default async function setLike(recipeId) {
  let url = 'http://localhost:8080/api/likes';
  let memberId = 4;
  const queryParams = new URLSearchParams({ recipeId, memberId }); // 임시로 1
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
