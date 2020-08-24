const BASE_URL = "http://localhost:3000/api/v1";

const api = async (...args) => {
  const res = await fetch(...args);
  let data = null;
  const contantType = res.headers.get("Content-Type");
  if (contantType && contantType.includes("application/json")) {
    data = await res.json();
  }
  if (res.ok) {
    return data;
  } else {
    const error = new Error(data?.message);
    error.code = res.status;
    throw error;
  }
};

const post = ({ url, jwt, data }) => {
  let headers = {};
  if (data) {
    headers["Content-Type"] = "application/json";
  }
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  return api(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    credentials: "include",
  });
};

const get = ({ url }) =>
  api(url, {
    credentials: "include",
  });

export const login = (creds) => {
  const path = creds.verificationCode ? "login-two-fa" : "login";
  return post({ url: `${BASE_URL}/account/${path}`, data: creds });
};

export const refreshToken = () =>
  get({ url: `${BASE_URL}/account/refresh-token` });

export const signup = (creds) =>
  post({ url: `${BASE_URL}/account/signup`, data: creds });

export const logout = (data) =>
  post({
    url: `${BASE_URL}/account/logout`,
    jwt: data.jwt,
    data: { allDevices: data.allDevices },
  });
