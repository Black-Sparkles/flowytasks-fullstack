const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
async function req(path, opt = {}) {
  const r = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json", ...(opt.headers || {}) },
    ...opt,
  });
  if (!r.ok) {
    const b = await r.json().catch(() => ({}));
    throw new Error(b.message || `Request failed (${r.status})`);
  }
  return r.status === 204 ? null : r.json();
}
export const taskApi = {
  list: () => req("/tasks"),
  create: (t) => req("/tasks", { method: "POST", body: JSON.stringify(t) }),
  update: (id, t) =>
    req(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(t) }),
  toggle: (id) => req(`/tasks/${id}/toggle`, { method: "PATCH" }),
  remove: (id) => req(`/tasks/${id}`, { method: "DELETE" }),
};
