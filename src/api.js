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
  const data = await apiFetch("/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
  // Store both access and refresh if present
  if (data.refresh) {
    setToken({ access: data.access, refresh: data.refresh });
  } else {
    setToken({ access: data.access, refresh });
  }
  return data;
}
// Admin delete user helper
export function deleteUser(userId) {
  return apiFetch("/delete-user/", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}
// Get training progress helper
export function getTrainingProgress() {
  return apiFetch("/training-progress/");
}
// Save training progress helper
export function saveTrainingProgress(data) {
  return apiFetch("/training-progress/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
// Get users by site helper
export function getUsersBySite() {
  return apiFetch("/users-by-site/");
}
// Create user helper
export function createUser(payload) {
  return apiFetch("/users/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
// Get current user helper
export function getMe() {
  return apiFetch("/me/");
}

// JWT login helper
export async function login(username, password) {
  const data = await apiFetch("/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  // Store both access and refresh tokens
  setToken({ access: data.access, refresh: data.refresh });
  return data;
}

// Admin login helper
export async function adminLogin(username, password) {
  const data = await apiFetch("/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setToken({ access: data.access, refresh: data.refresh });
  return data;
}

// Update user site helper
export async function updateSite(siteInfo) {
  return apiFetch("/update-site/", {
    method: "POST",
    body: JSON.stringify(siteInfo),
  });
}

// Password reset helper
export async function passwordReset(email) {
  return apiFetch("/password_reset/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/* ========== TOKEN HELPERS ========== */
export function getToken() {
  return localStorage.getItem("access_token");
}

export function setToken(token) {
  if (typeof token === "object" && token.access && token.refresh) {
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);
  } else {
    localStorage.setItem("access_token", token);
  }
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

/* ========== REQUEST HELPER ========== */
export async function apiFetch(path, options = {}) {
  let token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // If unauthorized, try to refresh token and retry once
  if (res.status === 401) {
    // Try to get refresh token from storage
    const refresh = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
    if (refresh) {
      try {
        const refreshRes = await fetch(`${API_BASE}/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          setToken(refreshData.access);
          token = refreshData.access;
          // Retry original request with new token
          const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${token}`,
          };
          res = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers: retryHeaders,
          });
        } else {
          // Refresh failed, remove tokens and redirect to login
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/login";
          throw new Error("Session expired. Please log in again.");
        }
      } catch (err) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }
    } else {
      // No refresh token, remove tokens and redirect to login
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }

  return res.json();
}
