import { useState, type FormEvent } from 'react'
import { register } from '../api/client'

export function RegisterPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  // loading/error/message 상태

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    //form 제출 시 페이지 새로고침을 막는다.
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const registerInput = {
        email,
        password
      }
      const user = await register(registerInput)
      setMessage(`가입 완료: ${user.email}`)
    }
    catch(error) {
      setError(error instanceof Error ? error.message : '회원가입에 실패했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>회원가입</h1>
      <input value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}
        placeholder= "email"
      />
      <input value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        placeholder= "password"
      />
      <button type="submit">가입</button>

      {/* error/message 출력 */}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  )
}