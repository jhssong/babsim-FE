import { baseURL } from '../api';

/*
NFT 판매 중단 API
@recipeId(Long) recipe ID
*/
export default async function deleteNft({ recipeId }) {
  let url = `${baseURL}/nft/saleNft`;
  const queryParams = new URLSearchParams({ recipeId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete nft sale request');
  const responseData = await response.json();
  return responseData;
}
