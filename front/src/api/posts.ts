// front/src/api/posts.ts
import { request } from '@/api/client'
import type {Post} from '@/types/posts'

export function listPosts(): Promise<Post[]> {
  return request<Post[]>('/posts')
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