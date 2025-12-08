// Utility functions for authentication and protected requests

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
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
