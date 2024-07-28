import { baseURL } from '../api';

export async function getRelatedKeywords(keyword) {
  const url = new URL(`${baseURL}/keywords/related`);
  url.searchParams.append('keyword', keyword);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get related keywords data');
  const responseData = await response.json();
  return responseData;
}
