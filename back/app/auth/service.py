import os
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from back.app import models
from app.auth import repository
from app.auth import schema

# region 비밀번호 hash 관련 설정
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
    argon2__type="ID",
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

if SECRET_KEY is None:
    raise RuntimeError("SECRET_KEY is not set")
#endregion

# region 비밀번호 관련 함수 
def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
# endregion

# region 토큰 관련 함수
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> int:
    credentials_exception = HTTPException(
        status_code = 401,
        detail="인증 정보가 유효하지 않습니다.",
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception
        
        return int(user_id)

    except JWTError: 
        raise credentials_exception
# endregion

def register_user(db:Session, user_in: schema.UserCreate) -> models.User:
    # 가입하려는 email이 중복인지 확인
    existing_user = repository.get_user_by_email(db, user_in.email);
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")

    hashed_password = hash_password(user_in.password)
    return repository.create_user(
        db=db,
        email=user_in.email,
        hashed_password=hashed_password
    )

def login_user(db:Session, user_in: schema.UserLogin) -> models.User:
    user = repository.get_user_by_email(db, user_in.email)
    if user is None or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="이메일이나 비밀번호가 틀렸습니다.")
    
    access_token = create_access_token({"sub": str(user.id)})

    return schema.Token(access_token=access_token, token_type="bearer")

def get_user_from_token(db:Session, token:str) ->models.User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="인증 정보가 유효하지 않습니다.",
    )

    user_id = verify_token(token)
    user = repository.get_user_by_id(db, user_id)

    if user is None:
        raise credentials_exception

    return user

