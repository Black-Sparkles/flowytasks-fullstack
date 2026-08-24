const API_ORIGIN =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8081"
    : "https://flowytasks-api.onrender.com";

const BASE = `${API_ORIGIN}/api`;

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

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
