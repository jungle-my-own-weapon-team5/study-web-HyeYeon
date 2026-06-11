import { useState, type FormEvent } from 'react'
import { register } from '../api/client'
import { TextInput } from '../components/TextInput';
import { SubmitButton } from '../components/SubmitButton';

export function RegisterPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    //form 제출 시 페이지 새로고침을 막는다.
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      if(!email.trim()){
          setError('이메일을 입력해주세요.')
          return 
      }
      if(password.length < 8){
          setError('비밀번호는 8자 이상이어야 합니다.')
          return
      }

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
    finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>회원가입</h1>
      <TextInput value={email} 
        onChange={setEmail}
        placeholder= "email"
      />
      <TextInput value={password}
        onChange={setPassword}
        placeholder= "password"
      />
      <SubmitButton 
        children={loading ? '가입 중 ...' : '가입'}
        type="submit" 
        disabled={loading} 
        />
        

      {/* error/message 출력 */}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  )
}