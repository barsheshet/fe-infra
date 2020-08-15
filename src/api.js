const BASE_URL = "http://localhost:3000/api/v1";

async function api(...args) {
  const res = await fetch(...args);
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  const error = new Error(data.message);
  error.code = data.statusCode;
  throw error;
}

export const login = (creds) =>
  api(`${BASE_URL}/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    credentials: "include",
  });

export const refreshToken = () =>
  api(`${BASE_URL}/account/refresh-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
