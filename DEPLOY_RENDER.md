# Deploy FlowyTasks to Render

This project is configured for Render using the root `render.yaml` Blueprint.

## 1. Push the project to GitHub

Commit the project contents to a GitHub repository. Do **not** commit `.env`.
The provided `.gitignore` excludes local secret files, and `.env.example` documents the variables required for local development.

## 2. Create the Render Blueprint

1. Sign in to Render.
2. Choose **New > Blueprint**.
3. Connect the GitHub repository containing this project.
4. Render detects `render.yaml` in the repository root.
5. Apply the Blueprint.

The Blueprint creates:

- `flowytasks` — React/Vite static site
- `flowytasks-api` — Spring Boot Docker web service
- `flowytasks-db` — managed PostgreSQL database

The database password is supplied to the backend by Render and is not committed to GitHub.
The frontend gets the backend's public Render URL at build time through `VITE_API_ORIGIN`.

## 3. Verify the deployment

After all resources are live:

1. Open the public `flowytasks` URL.
2. Create a task.
3. Refresh the page and confirm that the task remains.
4. Open the backend URL with `/api/tasks` appended and confirm the API returns JSON.

## Local development

Copy `.env.example` to `.env`, replace the placeholder password, then run:

```bash
docker compose up --build
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8080/api/tasks`
