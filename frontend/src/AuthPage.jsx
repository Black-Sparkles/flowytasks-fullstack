import { useState } from "react";
import { authApi, saveSession } from "./api";

export default function AuthPage({ onAuthenticated, onBack }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response =
        mode === "register"
          ? await authApi.register(form)
          : await authApi.login({
              email: form.email,
              password: form.password,
            });

      saveSession(response);
      onAuthenticated({
        userId: response.userId,
        name: response.name,
        email: response.email,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <main className="auth-page">
      <button className="auth-back" type="button" onClick={onBack}>
        ← Back to welcome
      </button>

      <section className="auth-card">
        <div className="auth-intro">
          <span className="welcome-brand-mark">F</span>
          <p className="welcome-kicker">FLOWYTASKS</p>
          <h1>
            {mode === "login"
              ? "Welcome back."
              : "Create your task space."}
          </h1>
          <p>
            {mode === "login"
              ? "Sign in to continue where you left off."
              : "Create an account and keep your tasks private to you."}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => switchMode("register")}
          >
            Create account
          </button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === "register" && (
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
                maxLength="80"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={update}
              placeholder="At least 8 characters"
              minLength="8"
              maxLength="72"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <p className="auth-footnote">
          Your tasks are linked to your account and are not shared with other
          FlowyTasks users.
        </p>
      </section>
    </main>
  );
}
