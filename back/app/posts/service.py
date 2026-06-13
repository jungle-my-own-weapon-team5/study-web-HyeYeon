from sqlalchemy.orm import Session
from fastapi import HTTPException

from back.app import models
from app.posts import schema
from app.posts import repository

def create_post(    
    post_in: schema.PostCreate,
    db: Session,
    current_user: models.User,
) -> models.Post:
    return repository.create_post(
        db=db,
        post_in = post_in,
        author_id=current_user.id
    )

def list_posts(db: Session) -> list[models.Post]:
    return repository.list_posts(db)

def get_post(db: Session, post_id: int):
    post = repository.get_post_by_id(db, post_id)

    if(post is None):
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    
    return post