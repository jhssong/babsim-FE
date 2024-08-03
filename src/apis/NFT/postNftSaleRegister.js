import { baseURL } from '../api';

/*
NFT 판매 등록 API
@recipeId(Long) NFT ID
@price(BigDecimal) 판매 가격
*/
export default async function postNftSaleRegister({ recipeId, price }) {
  let url = `${baseURL}/api/nft/saleNft`;
  const queryParams = new URLSearchParams({ recipeId, price });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  if (!response.ok) throw new Error('Failed to post nft sale register request');
  const responseData = await response.json();
  return responseData;
}
