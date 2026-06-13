// front/src/pages/PostListPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { listPosts } from '@/api/posts'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types/posts'

const PAGE_SIZE = 5

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

export function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    setLoading(true)
    setError('')

    listPosts({ page: currentPage, pageSize: PAGE_SIZE })
      .then((data) => {
        setPosts(data.items)
        setTotal(data.total)
        setTotalPages(data.total_pages)
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : '게시글 목록 조회에 실패했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  function goPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1))
  }

  function goNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1))
  }

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Board</p>
          <h2 className="text-3xl font-semibold tracking-tight">게시판 홈</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            전체 게시글을 확인하고 관심 있는 글을 열어볼 수 있습니다.
          </p>
        </div>

        {isAuthenticated && (
          <Button asChild>
            <Link to="/posts/new">글쓰기</Link>
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>최근 게시글</CardTitle>
          <CardDescription>
            총 {total}개의 게시글 중 {currentPage}/{totalPages}페이지를 보고 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-sm text-muted-foreground">게시글을 불러오는 중입니다.</p>}

          {!loading && posts.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm font-medium">아직 게시글이 없습니다.</p>
              <p className="mt-1 text-sm text-muted-foreground">첫 번째 게시글을 작성해보세요.</p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="flex flex-col divide-y">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="group flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium group-hover:underline">{post.title}</h3>
                    <span className="shrink-0 text-xs text-muted-foreground">#{post.id}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>작성자 ID: {post.author_id}</span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!loading && total > 0 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" type="button" onClick={goPreviousPage} disabled={currentPage === 1}>
            이전
          </Button>
          <p className="text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </p>
          <Button variant="outline" type="button" onClick={goNextPage} disabled={currentPage === totalPages}>
            다음
          </Button>
        </div>
      )}
    </section>
  )
}