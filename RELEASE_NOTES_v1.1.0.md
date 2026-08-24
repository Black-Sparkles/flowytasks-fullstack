# FlowyTasks v1.1.0 — Private Accounts & Authentication

FlowyTasks v1.1.0 introduces private user accounts, making each task space personal to the signed-in user.

## New

- Create a FlowyTasks account
- Sign in and log out
- Passwords are securely hashed before storage
- Signed JWT authentication for protected API requests
- Every new task is linked to its owner
- Users can only view, edit, complete, and delete their own tasks
- Added a public health endpoint for deployment monitoring
- Added secure JWT secret handling for local and Render environments

## Security

- Database passwords remain environment-managed
- JWT signing secrets are not stored in source code
- Render generates the production JWT secret
- Task API endpoints require authentication

## Upgrade note

Tasks created before accounts were introduced are retained in the database but are not assigned to any user and are therefore not displayed after upgrading.
