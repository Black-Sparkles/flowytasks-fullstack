# FlowyTasks v1.2.0 — Automated Testing & CI

FlowyTasks v1.2.0 strengthens application reliability with automated backend and frontend tests and a CI workflow that validates every push and pull request.

## Added

- Authentication service tests
- Duplicate-account and invalid-login tests
- User-specific task ownership tests
- JWT generation and validation tests
- Frontend login-flow tests
- Frontend account-creation UI tests
- Dashboard statistics tests
- GitHub Actions test execution for backend and frontend

## CI Improvements

Every push and pull request to `main` now:

1. Runs the Spring Boot test suite
2. Builds the backend
3. Runs the React/Vitest suite
4. Builds the frontend

A failed test causes the CI workflow to fail before the change is treated as healthy.

## Why This Matters

This release adds automated regression protection around FlowyTasks' most important behavior: authentication, private task ownership, and core frontend interactions.
