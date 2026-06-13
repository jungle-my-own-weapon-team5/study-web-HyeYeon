from pydantic import BaseModel, Field
from datetime import datetime

# 게시글 작성
class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)

class PostUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class PostListResponse(BaseModel):
    items:list[PostResponse]
    total: int
    page: int
    page_size: int
    total_pages:int
class PostDeleteResponse(BaseModel):
    message: str