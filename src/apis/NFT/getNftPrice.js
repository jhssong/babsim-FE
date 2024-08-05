import { baseURL } from '../api';
/*
NFT 구매 전 정보 조회 API
@recipeId(Long)
@memberId(String)
*/

export default async function getNftPrice({ recipeId, memberId }) {
  let url = `${baseURL}/nft/transactionBeforeInfo`;
  const queryParams = new URLSearchParams({ recipeId, memberId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get NFT price');
  const responseData = await response.json();
  return responseData;
}
