from sqlalchemy.orm import Session

from app.posts import schema
from app import models

#전체 게시글 개수 조회
def count_posts(db: Session) -> int:
    return db.query(models.Post).count()

#게시글 생성
def create_post(
    db: Session,
    post_in: schema.PostCreate,
    author_id: int
) -> models.Post:
    post = models.Post(
        title = post_in.title,
        content = post_in.content,
        author_id = author_id,
    )

    db.add(post)
    db.commit()
    db.refresh(post)
    return post

#전체 게시글 조회
def list_posts(
    db: Session, 
    offset: int, 
    limit: int
) -> list[models.Post]:
    return (
        db.query(models.Post)
        .order_by(models.Post.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

#id로 게시글 단건 조회
def get_post_by_id(
        db: Session,
        post_id: int,
)->models.Post:
    return db.query(models.Post).filter(models.Post.id == post_id).first()

#게시글 수정
def update_post():
    pass

#게시글 삭제
def delete_post()->None:
    pass

    