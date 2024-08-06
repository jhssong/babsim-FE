import { baseURL } from '../api';

export async function getTransaction(memberId) {
  const url = new URL(`${baseURL}/point/log`);
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
