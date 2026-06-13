// front/src/pages/PostCreatePage.tsx
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { createPost } from '@/api/posts'

export function PostCreatePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }

    if (!content.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const post = await createPost({ title, content })
      navigate(`/posts/${post.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : '게시글 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-4">
      <h2 className="text-2xl font-semibold">게시글 작성</h2>
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목" />
      <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="내용" />
      <button type="submit" disabled={loading}>{loading ? '작성 중...' : '작성'}</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}