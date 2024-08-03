import { baseURL } from '../api';

/**
 * Retrieves NFT data and returns a JSON object with all the NFTs.
 *
 * @returns {Promise<Object[]>} Returns a promise that resolves to an array of NFT objects.
 * Each NFT object contains the following properties:
 * {
 *   "id": "NFT ID",
 *   "img": "NFT 이미지",
 *   "recipeID": "레시피 ID",
 *   "name": "레시피명으로 작명된 NFT 이름",
 *   "price": "NFT 가격"
 * }
 */
export default async function getNfts() {
  const response = await fetch({ baseURL } + '/nfts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get nfts data');
  const responseData = await response.json();
  return responseData;
}
