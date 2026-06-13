from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from back.app import models
from app.database import get_db
from app.auth import service
from app.auth import schema

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    return service.get_user_from_token(db, token);

#회원가입
@router.post("/register", response_model=schema.UserResponse)
def register(user_in: schema.UserCreate, db: Session = Depends(get_db)):
    return service.register_user(db, user_in);

#로그인
@router.post("/login",  response_model=schema.Token)
def login(
    user_in:schema.UserLogin, 
    db: Session = Depends(get_db), 
):
    return service.login_user(db, user_in)

# Swagger Authorize 전용 로그인
@router.post("/token", response_model=schema.Token)
def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user_in = schema.UserLogin(
        email=form_data.username,
        password=form_data.password,
    )
    return service.login_user(db, user_in)

#테스트 API
@router.get("/me", response_model=schema.UserResponse)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user
     
    
