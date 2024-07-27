/*
레시피 조회 API
{path} : recipeId
@memberID (nullable) (String)
*/
export default async function getRecipeInfo(recipeId, memberId) {
  let url = 'http://localhost:8080/api/recipes/' + recipeId;
  // // Query Parameter를 추가 (memberID가 있는 경우에만)
  if (memberId) {
    const queryParams = new URLSearchParams({ memberId });
    url += '?' + queryParams.toString();
  }

  console.log(`${url} and working`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe info');
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
