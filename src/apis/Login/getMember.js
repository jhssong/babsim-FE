import { baseURL } from '../api.js';

export default async function getMember(memberId) {
  const response = await fetch(`${baseURL}/members/` + memberId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to get member data');
  const responseData = await response.json();
  return responseData;
}
