export default async function createMember(data) {
  await fetch('http://localhost:8080/api/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create periodical donation');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}
