from sqlalchemy.orm import Session
from app import models

def get_user_by_email(db: Session, email: str) -> models.User | None:
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int) -> models.User | None:
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, email: str, hashed_password: str) -> models.User:
    # user 객체 생성
    user = models.User(
        email = email,
        hashed_password = hashed_password,
    )

    #저장 예정 상태로 등록
    db.add(user)

    #DB에 확정 저장
    db.commit()

    #DB가 채운 정보 다시 읽고 반환
    db.refresh(user)
    return user
