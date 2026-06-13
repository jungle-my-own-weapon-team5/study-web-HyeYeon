from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.router import get_current_user

from back.app import models
from app.posts import schema
from app.posts import service

router = APIRouter(prefix="/posts", tags=["posts"])

#게시글 작성
@router.post("", response_model=schema.PostResponse)
def create_post(
    post_in: schema.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> models.Post:
    return service.create_post(db=db, post_in=post_in,current_user=current_user)

#전체 게시글 조회
@router.get("", response_model=list[schema.PostResponse])
def list_posts(
    db: Session = Depends(get_db)
):
    return  service.list_posts(db)

#게시글 id기반 단건 조회
@router.get("{post_id}", response_model=schema.PostResponse)
def list_posts(
    db: Session = Depends(get_db),
    post_id = int,
):
    return service.get_post(db, post_id)