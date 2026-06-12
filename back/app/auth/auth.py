from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app import schemas, models
from app.database import get_db
from back.app.auth import service

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    return service.get_user_from_token(db, token);

#회원가입
@router.post("/register", response_model=schemas.UserResponse)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    return service.register_user(db, user_in);

#로그인
@router.post("/login",  response_model=schemas.Token)
def login(
    user_in:schemas.UserLogin, 
    db: Session = Depends(get_db), 
):
    return service.login_user(db, user_in)

#테스트 API
@router.get("/me", response_model=schemas.UserResponse)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user
     
    
