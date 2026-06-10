import { useState } from 'react'
import { RegisterPage } from './pages/RegisterPage'

function App() {

  // 모드: 'login' | 'register' | 'me'
  const [mode, setMode] = useState('login');

  // mode에 따라 LoginPage/RegisterPage/MePage를 보여준다.

  return (
    <main>

      <nav>
        <button type="button"
          onClick={ ()=> setMode('register') }
        >
          회원가입
        </button>
      </nav>

      {mode === 'register' && <RegisterPage />}
    </main>
  )
}



export default App