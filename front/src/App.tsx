import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';

import { PostListPage } from './pages/PostListPage'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)

  //앱이 시작될 때 token이 있으면 /auth/me를 호출해 user를 복구
  const accessToken = useAuthStore((state) => state.accessToken)
  const fetchMe = useAuthStore((state) => state.fetchMe)

  //화면을 그린 뒤에 첫 인자 함수 실행
  useEffect(() => {

    //토큰이 없으면 아무것도 하지 말고 끝낸다
    if (!accessToken) 
      return

    //토큰이 있으면 /auth/me 같은 API를 호출해서 현재 사용자 정보를 가져온다
    //내 정보 조회에 실패 => 로그아웃 처리(토큰이 잘못됐거나 만료된 것)
    fetchMe().catch(() => {
      logout()
    })
  }, [accessToken, fetchMe, logout])

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <nav className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <h1 className="text-lg font-semibold">게시판 개인 구현</h1>
            <div className="flex gap-2">

              {!isAuthenticated && (
                <>
                  <Link className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100" to="/register">회원가입</Link>
                  <Link className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100" to="/login">로그인</Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Link className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100" to="/me">
                    내 정보
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          </nav>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/me"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/posts" element={<PostListPage />} />
            </Routes>
          </section>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
