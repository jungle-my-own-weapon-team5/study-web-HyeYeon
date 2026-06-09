# study-web-HyeYeon

## Docker development

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- PostgreSQL: localhost:5434

Stop containers:

```bash
docker compose down
```

Check logs:

```bash
docker compose logs -f
```

`docker-compose.yml` runs three services:

- `postgres`: PostgreSQL 16 with pgvector support.
- `backend`: FastAPI app from `back/`.
- `frontend`: Vite React app from `front/`.

The backend uses `DATABASE_URL=postgresql://study_user:study_password@postgres:5432/study_web_db` inside Docker. From the host machine, use `localhost:5434` instead. See `.env.example`.
