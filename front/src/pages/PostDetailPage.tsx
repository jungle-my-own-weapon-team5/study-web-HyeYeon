// front/src/pages/PostDetailPage.tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getPost } from '@/api/posts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types/posts'

export function PostDetailPage() {
  const { postId } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState('')
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const id = Number(postId)

    if (!Number.isInteger(id)) {
      setError('잘못된 게시글 주소입니다.')
      return
    }

    getPost(id)
      .then(setPost)
      .catch((error) => {
        setError(error instanceof Error ? error.message : '게시글 조회에 실패했습니다.')
      })
  }, [postId])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!post) {
    return <p className="text-sm text-muted-foreground">게시글을 불러오는 중입니다.</p>
  }

  const isAuthor = user?.id === post.author_id

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <Button variant="ghost" asChild className="w-fit">
        <Link to="/posts">목록으로</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-3 text-sm text-muted-foreground">
            <span>작성자 ID: {post.author_id}</span>
            <span>{new Date(post.created_at).toLocaleString()}</span>
          </div>

          <div className="whitespace-pre-wrap text-sm leading-7">
            {post.content}
          </div>

          {isAuthor && (
            <div className="flex gap-2 border-t pt-4">
              <Button variant="outline" asChild>
                <Link to={`/posts/${post.id}/edit`}>수정</Link>
              </Button>
              <Button variant="destructive" type="button">
                삭제
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  )
}