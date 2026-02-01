import API_BASE from "../config";
// Safely remove authentication data from both localStorage and sessionStorage
export function removeAuth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  localStorage.removeItem("site");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("jwt_token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("site");
}
export function getToken() {
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
}

export function getUser() {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user, remember = true) {
  if (remember) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

export function setToken(token, remember = true) {
  if (remember) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
}


export function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}
