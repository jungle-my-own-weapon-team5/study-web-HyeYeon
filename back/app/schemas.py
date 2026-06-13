from pydantic import BaseModel, Field
from datetime import datetime

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