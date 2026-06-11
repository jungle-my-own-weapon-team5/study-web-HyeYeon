import { useState, type FormEvent } from 'react'
import { login } from '../api/client'
import {saveToken} from '../api/token'

import { TextInput } from '../components/TextInput';
import {SubmitButton} from '../components/SubmitButton';

export function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
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

            const LoginInput = {
                email, 
                password
            }

            const result = await login(LoginInput);
            saveToken(result.access_token);
            setMessage('로그인 완료');
        }
        catch (error) {
            setError(error instanceof Error ? error.message : '로그인에 실패했습니다.')
        }
        finally{
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>로그인</h1>
            <TextInput value={email}
                onChange={setEmail}
                placeholder="email"/>
            <TextInput value={password}
                onChange={setPassword}
                placeholder="password"/>
            <SubmitButton 
                children = {loading ? '로그인 중...' : '로그인'}
                type="submit" 
                disabled={loading} />
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </form>
    )
}