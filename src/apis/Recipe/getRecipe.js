import { baseURL } from '../api';

/**
 * @returns {json} Returns a json object with all the nfts
 */
export async function getRecipe(keyword) {
  const url = new URL(`${baseURL}/recipes`);
  url.searchParams.append('keyword', keyword);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
/**
 *
 * @returns {json} Returns a json object with 이번주 레시피
 */
export async function getRecipeWeek() {
  const url = new URL(`${baseURL}/recipes/week`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
/**
 *
 * @param {*} memberId - user id
 * @returns {json} Returns a json object with 추천 레시피
 */
export async function getRecipeRecommend(memberId) {
  const url = new URL(`${baseURL}/recipes/recommend`);
  url.searchParams.append('memberId', memberId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
/**
 *
 * @param {*} memberId - user id
 * @returns {json} Returns a json object with 찜한 레시피
 */
export async function getRecipeLikes(memberId) {
  const url = new URL(`${baseURL}/recipes/likes`);
  url.searchParams.append('memberId', memberId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
/**
 *
 * @param {*} memberId - user id
 * @returns {json} Returns a json object with fork한 레시피
 */
export async function getRecipeForked(memberId) {
  const url = new URL(`${baseURL}/recipes/forked`);
  url.searchParams.append('memberId', memberId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
/**
 *
 * @param {*} memberId - user id
 * @returns {json} Returns a json object with 나의 레시피
 */
export async function getRecipeOwn(memberId) {
  const url = new URL(`${baseURL}/recipes/own`);
  url.searchParams.append('memberId', memberId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}

/**
 *
 * @param {*} categoryId - category id
 * @returns {json} Returns a json object with 카테고리별 레시피
 */
export async function getRecipeCateoreis(categoryId) {
  const url = new URL(`${baseURL}/recipes/category/${categoryId}`);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get recipe data');
  const responseData = await response.json();
  return responseData;
}
