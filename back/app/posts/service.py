import math
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app import models
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

def list_posts(db: Session, page:int, page_size:int
) -> schema.PostListResponse:
    
    if page < 1:
        raise HTTPException(status_code=400, detail="page는 1 이상이어야 합니다.")

    if page_size < 1 or page_size > 50:
        raise HTTPException(status_code=400, detail="page_size는 1 이상 50 이하여야 합니다.")

    total = repository.count_posts(db)
    total_pages = max(1, math.ceil(total / page_size))
    offset = (page - 1) * page_size

    posts = repository.list_posts(db, offset=offset, limit=page_size)

    return schema.PostListResponse(
        items=posts,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )

def get_post(db: Session, post_id: int):
    post = repository.get_post_by_id(db, post_id)

    if(post is None):
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    
    return post