// front/src/pages/PostListPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { listPosts } from '@/api/posts'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types/posts'

export function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    listPosts()
      .then(setPosts)
      .catch((error) => {
        setError(error instanceof Error ? error.message : '게시글 목록 조회에 실패했습니다.')
      })
  }, [])

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">게시글</h2>
        {isAuthenticated && (
          <Link to="/posts/new" className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white">
            글쓰기
          </Link>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <ul className="divide-y rounded-md border">
        {posts.map((post) => (
          <li key={post.id} className="p-4">
            <Link to={`/posts/${post.id}`} className="font-medium hover:underline">
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500">작성자 ID: {post.author_id}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}