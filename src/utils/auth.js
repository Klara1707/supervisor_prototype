// Safely remove authentication data from both localStorage and sessionStorage
export function removeAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  localStorage.removeItem("site");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("jwt_token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("site");
}
export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
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
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
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
