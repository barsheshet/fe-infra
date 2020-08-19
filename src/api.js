const BASE_URL = "http://localhost:3000/api/v1";

const api = async (...args) => {
  const res = await fetch(...args);
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  const error = new Error(data.message);
  error.code = data.statusCode;
  throw error;
};

const post = (url, data) =>
  api(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

const get = (url) =>
  api(url, {
    credentials: "include",
  });

export const login = (creds) => {
  const path = creds.verificationCode ? "login-two-fa" : "login";
  return post(`${BASE_URL}/account/${path}`, creds);
};

export const refreshToken = () => get(`${BASE_URL}/account/refresh-token`);

export const signup = (creds) => post(`${BASE_URL}/account/signup`, creds);
