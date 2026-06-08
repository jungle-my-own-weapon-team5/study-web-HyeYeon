from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

# 회원가입
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    model_config = {"from_attributes": True}

# 로그인
class UserLogin(BaseModel):
    email:EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# 게시글 작성
class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}

# 댓글 작성
class CommentCreate(BaseModel):
    content: str = Field(min_length=1)

class CommentResponse(BaseModel):

    id: int
    content: str
    post_id: int
    author_id: int
    created_at: datetime

    model_config = {"from_attributes": True}