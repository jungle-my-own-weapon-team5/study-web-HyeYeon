import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

from fastapi import APIRouter, Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app import schemas, models

router = APIRouter(prefix="/auth", tags=["auth"])

#비밀번호 hash & 검증
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
    argon2__type="ID",
)

def hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

#토큰 만들기
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

if SECRET_KEY is None:
    raise RuntimeError("SECRET_KEY is not set")

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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> models.User:
    credentials_exception = HTTPException(
        status_code = 401,
        detail="인증 정보가 유효하지 않습니다.",
    )

    user_id = verify_token(token)

    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception

    return user

#회원가입
@router.post("/register", response_model=schemas.UserResponse)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    
    # email이 기존 사용자
    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # user 객체를 만든다
    user = models.User(
        email = user_in.email,
        hashed_password=hash_password(user_in.password),
    )

    #저장 예정 상태로 등록
    db.add(user)

    #DB에 확정 저장
    db.commit()

    #DB가 채운 정보 다시 읽고 반환
    db.refresh(user)
    return user

#로그인
@router.post("/login",  response_model=schemas.Token)
def login(
    user_in:schemas.UserLogin, 
    db: Session = Depends(get_db), 
):

    # email로 사용자를 찾는다.
    user = db.query(models.User).filter(models.User.email == user_in.email).first()

    # 없으면 로그인 실패, 
    # password가 틀리면 로그인 실패.
    if user is None or \
        not verify_password(user_in.password, user.hashed_password): 
        raise HTTPException(status_code=401, detail="이메일이나 비밀번호가 틀렸습니다.")
    
    # 맞으면 token을 만들어 반환한다.
    access_token = create_access_token({"sub": str(user.id)})

    return {"access_token": access_token, "token_type":"bearer"}

#테스트 API
@router.get("/me", response_model=schemas.UserResponse)
def read_me(current_user: models.User = Depends(get_current_user)):
    return current_user
     
    