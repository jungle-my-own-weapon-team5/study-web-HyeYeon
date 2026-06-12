from pydantic import BaseModel, Field
from datetime import datetime



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

class PostUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)

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