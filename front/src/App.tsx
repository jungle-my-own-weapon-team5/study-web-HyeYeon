import { useState } from 'react'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';

function App() {

  const [mode, setMode] = useState<'login' | 'register' | 'myPage'>('login');

  return (
    <main>

      <nav>
        <button type="button"
          onClick={ ()=> setMode('register') }
        >
          회원가입
        </button>

        <button type="button"
          onClick={ ()=> setMode('login') }
        >
          로그인
        </button>

        <button type="button"
          onClick={ ()=> setMode('myPage') }
        >
          내 정보
        </button>
      </nav>

      {/* mode에 따라 LoginPage/RegisterPage/MePage를 보여준다. */} 
      {mode === 'register' && <RegisterPage />}
      {mode === 'login' && <LoginPage />}
      {mode === 'myPage' && <MyPage />}

    </main>
  )
}

export default App