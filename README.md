# FlowyTasks

FlowyTasks is a full-stack task-management application built with **React, Java, Spring Boot, PostgreSQL, Docker, and GitHub Actions**.

## Why I built it
I wanted to demonstrate how a modern frontend, REST API, relational database, and containerized development environment work together in a real application rather than a static website.

## Features
- Create, edit, complete, and delete tasks
- LOW, MEDIUM, and HIGH priorities
- Due dates and task descriptions
- Filter by all, active, or completed
- Dashboard statistics
- REST API validation and error handling
- PostgreSQL persistence
- Responsive React interface
- Docker Compose local environment
- GitHub Actions build workflow

## Stack
**Frontend:** React 19, Vite 8, JavaScript, HTML, CSS  
**Backend:** Java 21, Spring Boot 4.1.1, Spring Web, Spring Data JPA, Bean Validation  
**Database:** PostgreSQL  
**DevOps:** Docker, Docker Compose, GitHub Actions

## Architecture
```text
Browser -> React/Vite -> HTTP/JSON -> Spring Boot REST API -> JPA -> PostgreSQL
```

## API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| PATCH | `/api/tasks/{id}/toggle` | Toggle completion |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Run with Docker
```bash
docker compose up --build
```
Open `http://localhost:5173` for the frontend. The API runs at `http://localhost:8080/api/tasks`.

## Run manually
Create a PostgreSQL database named `FlowyTasks` with user/password `FlowyTasks`, or set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`.

Backend:
```bash
cd backend
mvn spring-boot:run
```
Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Example payload
```json
{
  "title": "Build portfolio website",
  "description": "Create a responsive portfolio and add project case studies.",
  "priority": "HIGH",
  "dueDate": "2026-09-01",
  "completed": false
}
```

## What I learned
- REST API design and CRUD operations
- React state and API integration
- JPA data modeling and PostgreSQL persistence
- Validation and exception handling
- Dockerizing a multi-service application
- CI builds with GitHub Actions

## Next improvements
- User authentication and authorization
- Unit and integration tests
- Search, sorting, tags, and pagination
- Production deployment to AWS with Terraform
- Monitoring and logging




## v1.1.0 Authentication

FlowyTasks now supports private user accounts.

### Authentication features

- User registration
- User login
- BCrypt password hashing
- JWT-based stateless authentication
- Per-user task ownership
- Protected task API endpoints
- Logout and local session handling
- Render-generated production JWT signing secret

### Authentication endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/health` | Public deployment health check |

All `/api/tasks/**` requests require:

```text
Authorization: Bearer <token>
```

### Migration note

Tasks created before v1.1.0 do not have a user owner. They remain in the database for migration safety but are intentionally not shown to authenticated users. New tasks are automatically linked to the signed-in user.
