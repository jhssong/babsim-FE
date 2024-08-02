import { baseURL } from '../../api';

/*
NFT 구매 API
@nftId(Long) NFT ID
@memberId(String) 현재 로그인 되어 있는 멤버Id(구매자 ID)
*/
export default async function postNftPurchase({ nftId, memberId }) {
  let url = `${baseURL}/api/nft/saleNft` + nftId;
  const queryParams = new URLSearchParams({ memberId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  if (!response.ok) throw new Error('Failed to post nft purchase request');
  const responseData = await response.json();
  return responseData;
}
