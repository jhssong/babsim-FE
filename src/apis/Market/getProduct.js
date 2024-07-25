import { baseURL } from '../api';

/**
 * @param {void} Nothing
 * @returns {json} Returns a json object with all the 추천 상품
 */
export async function getProductRecommend() {
  const url = new URL(`${baseURL}/products/recommend`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get nfts data');
  const responseData = await response.json();
  return responseData;
}
/**
 * @param {int} productId
 * @returns {json} Returns a json object with all the product info
 */
export async function getProductInfo(productId) {
  const url = new URL(`${baseURL}/products/${productId}`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get nfts data');
  const responseData = await response.json();
  return responseData;
}
/**
 * @returns {json} Returns a json object with all the hot product list
 */
export async function getProductHot() {
  const url = new URL(`${baseURL}/products/hot`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get nfts data');
  const responseData = await response.json();
  return responseData;
}
