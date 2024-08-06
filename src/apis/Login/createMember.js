export default async function createMember(data) {
  const response = await fetch('http://localhost:8080/api/members', {
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
