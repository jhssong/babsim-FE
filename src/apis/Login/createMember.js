import { baseURL } from '../api.js';

export default async function createMember(data) {
  const response = await fetch(`${baseURL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create member data');
  const responseData = await response.json();
  return responseData;
}
