export interface Post{
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: string;
    updated_at: string;
}

export interface PostListResponse {
    items: Post[]
    total: number
    page: number
    page_size: number
    total_pages: number
}

export interface PostInput{
    title:string;
    content:string;
}

export interface PostDeleteResponse{
    message:string;
}

//댓글
export interface CommentCreate {
    content: string;
}

export interface CommentResponse {
    id: number;
    content: string;
    post_id: number;
    author_id: number;
    created_at: string;
}