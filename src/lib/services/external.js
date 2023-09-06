export async function getRequest(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function postRequest(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}
