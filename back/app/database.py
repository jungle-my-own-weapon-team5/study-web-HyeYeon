import os #환경변수 읽기 위해 

#.env 파일 내용을 환경변수로 불러오기 위해
from dotenv import load_dotenv

#DB 연결용 engine을 만들기 위해
from sqlalchemy import create_engine

# declarative_base: 모델 클래스의 부모 Base 생성
# sessionmaker: DB 세션 생성기 SessionLocal 생성
from sqlalchemy.orm import declarative_base, sessionmaker


# 1. .env에서 DATABASE_URL 읽기
#.env 파일을 읽어서 환경변수로 등록
load_dotenv()

# DATABASE_URL 읽기
DATABASE_URL = os.getenv("DATABASE_URL")

#에러처리
if DATABASE_URL is None:
    raise RuntimeError("DATABASE_URL is not set")

# 2. SQLAlchemy engine 생성
# engine: SQLAlchemy가 DB와 연결할 때 쓰는 중심 객체
engine = create_engine(DATABASE_URL)

''' 3. SessionLocal 생성
autocommit=False: DB 변경사항을 자동으로 저장하지 않겠다
autoflush=False: 쿼리 전에 변경사항을 자동으로 DB에 반영하려는 동작을 끈다
bind=engine: 이 세션이 어떤 DB 연결을 사용할지 정한다.
'''
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# 4. Base 생성
Base = declarative_base()

# 5. get_db 함수 제공
def get_db():
    #요청이 들어오면 DB 세션을 만든다.
    db = SessionLocal()
    try:
        # API 함수에게 그 세션을 빌려준다.
        yield db
    finally: 
        # 요청 처리가 끝나면 세션을 닫는다.
        db.close()
