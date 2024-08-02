import { baseURL } from '../../api';

/*
NFT 판매 중단 API
@saleNftId(Long) NFT ID
@price(BigDecimal) 판매 가격
*/
export default async function deleteNft({ saleNftId, price }) {
  let url = `${baseURL}/api/nft/saleNft`;
  const queryParams = new URLSearchParams({ saleNftId, price });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete nft sale request');
  const responseData = await response.json();
  return responseData;
}
