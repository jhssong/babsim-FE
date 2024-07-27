import { baseURL } from '../api';

export async function getPopularKeywords(keyword) {
  const url = new URL(`${baseURL}/keywords/popular`);
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
