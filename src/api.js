// src/api.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// TEMP: expose for debugging in the browser console
if (typeof window !== 'undefined') {
  window.__API_BASE__ = API_BASE;
}

// Register user helper
export async function registerUser(data) {
  if (!API_BASE) {
    console.error('API_BASE is undefined. Set VITE_API_BASE_URL in Netlify and redeploy.');
    throw new Error('API not configured');
  }
  const res = await fetch(`${API_BASE}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  let payload;
  try { payload = JSON.parse(text); } catch { payload = { detail: text }; }
  if (!res.ok) throw new Error(payload?.detail || JSON.stringify(payload));
  return payload;
}
// Token refresh helper
export async function refreshToken(refresh) {
  const data = await apiFetch("/api/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
  setToken(data.access);
  return data;
}
// Admin delete user helper
export function deleteUser(userId) {
  return apiFetch("/api/delete-user/", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}
// Get training progress helper
export function getTrainingProgress() {
  return apiFetch("/api/training-progress/");
}
// Save training progress helper
export function saveTrainingProgress(data) {
  return apiFetch("/api/training-progress/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
// Get users by site helper
export function getUsersBySite() {
  return apiFetch("/api/users-by-site/");
}
// Create user helper
export function createUser(payload) {
  return apiFetch("/api/users/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
// Get current user helper
export function getMe() {
  return apiFetch("/api/me/");
}
// JWT login helper
export async function login(username, password) {
  const data = await apiFetch("/api/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken(data.access);
  return data;
}

/* ========== TOKEN HELPERS ========== */
export function getToken() {
  return localStorage.getItem("access_token");
}

export function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

/* ========== REQUEST HELPER ========== */
export async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }

  return res.json();
}
