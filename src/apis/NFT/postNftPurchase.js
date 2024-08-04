import { baseURL } from '../api';

/*
NFT 구매 API
@recipeId(Long) NFT ID
@memberId(String) 현재 로그인 되어 있는 멤버Id(구매자 ID)
*/
export default async function postNftPurchase({ recipeId, memberId }) {
  let url = `${baseURL}/api/nft/saleNft` + recipeId;
  const queryParams = new URLSearchParams({ memberId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  if (!response.ok) throw new Error('Failed to post nft purchase request');
  const responseData = await response.json();
  return responseData;
}
