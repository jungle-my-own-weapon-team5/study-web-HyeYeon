import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
        <Link to="/me">내 정보</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App