#FastAPI 앱 시작점
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from back.app import models
from app.database import engine
from app.auth.router import router as auth_router
from app.posts.router import router as posts_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(posts_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
