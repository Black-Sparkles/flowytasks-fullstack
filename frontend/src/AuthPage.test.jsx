import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuthPage from "./AuthPage";
import { authApi, saveSession } from "./api";

vi.mock("./api", () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
  saveSession: vi.fn(),
}));

describe("AuthPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("signs in and returns the authenticated user", async () => {
    const user = userEvent.setup();
    const onAuthenticated = vi.fn();

    authApi.login.mockResolvedValue({
      token: "jwt-token",
      userId: 7,
      name: "Taylor",
      email: "taylor@example.com",
    });

    render(<AuthPage onAuthenticated={onAuthenticated} onBack={vi.fn()} />);

    await user.type(screen.getByLabelText(/email/i), "taylor@example.com");

    await user.type(screen.getByLabelText(/password/i), "password123");

    const signInButtons = screen.getAllByRole("button", {
      name: /^sign in$/i,
    });

    await user.click(signInButtons[1]);

    expect(authApi.login).toHaveBeenCalledWith({
      email: "taylor@example.com",
      password: "password123",
    });

    expect(saveSession).toHaveBeenCalledWith({
      token: "jwt-token",
      userId: 7,
      name: "Taylor",
      email: "taylor@example.com",
    });

    expect(onAuthenticated).toHaveBeenCalledWith({
      userId: 7,
      name: "Taylor",
      email: "taylor@example.com",
    });
  });

  it("can switch to account creation", async () => {
    const user = userEvent.setup();

    render(<AuthPage onAuthenticated={vi.fn()} onBack={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /create account/i,
      }),
    );

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /create your task space/i,
      }),
    ).toBeInTheDocument();
  });
});
