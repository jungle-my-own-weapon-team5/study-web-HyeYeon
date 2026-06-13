// front/src/api/posts.ts
import { request } from '@/api/client'
import type {Post, PostListResponse } from '@/types/posts'

export function listPosts(params: {page: number, pageSize:number}): 
Promise<PostListResponse> {
    const searchParams = new URLSearchParams({
        page: String(params.page),
        page_size: String(params.pageSize),
    })
    return request<PostListResponse>(`/posts?${searchParams.toString()}`)
}

export function getPost(postId: number): Promise<Post> {
  return request<Post>(`/posts/${postId}`)
}

// export function createPost(input: PostInput): Promise<Post> {
    
// }

// export function updatePost(postId: number, input: PostInput): Promise<Post> {

// }

// export function deletePost(postId: number): Promise<PostDeleteResponse> {

// }