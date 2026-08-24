const API_ORIGIN =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8081"
    : "https://flowytasks-api.onrender.com";

const BASE = `${API_ORIGIN}/api`;

const TOKEN_KEY = "flowytasks_token";
const USER_KEY = "flowytasks_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSession(authResponse) {
  localStorage.setItem(TOKEN_KEY, authResponse.token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      userId: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
    }),
  );
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request(path, options = {}, authenticated = true) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authenticated && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && authenticated) {
    clearSession();
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      body.message || `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const authApi = {
  register: (details) =>
    request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(details),
      },
      false,
    ),

  login: (credentials) =>
    request(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      },
      false,
    ),
};

export const taskApi = {
  list: () => request("/tasks"),

  create: (task) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),

  update: (id, task) =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
    }),

  toggle: (id) =>
    request(`/tasks/${id}/toggle`, {
      method: "PATCH",
    }),

  remove: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
