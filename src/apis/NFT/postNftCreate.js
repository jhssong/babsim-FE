import { baseURL } from '../api';

/*
NFT 생성 API
@recipeId(Long) 레시피 ID
@creatorId(String) 작성자 ID
*/
export default async function postNftCreate({ recipeId }) {
  let url = `${baseURL}/nft`;
  let memberId = 1; // 임시로 4로 설정, 나중엔 props로 받아와야 함
  const queryParams = new URLSearchParams({ recipeId, memberId });
  url += `?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  if (!response.ok) throw new Error('Failed to post nft creation request');
  const responseData = await response.json;
  return responseData;
}
