import { useState, type FormEvent } from 'react'
import { login } from '@/api/client'
import { useAuthStore } from '@/stores/authStore'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setToken = useAuthStore((state) => state.setToken)
    
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

            // store 액션(setToken)을 호출 =>로그인 성공 사실을 전역 상태가 알게 함
            setToken (result.access_token);

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
        <Card className="mx-auto w-full max-w-md">
            <CardTitle>
                <CardHeader>로그인</CardHeader>
            </CardTitle>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="login-email">이메일</Label>
                    <Input id="login-email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="login-password">비밀번호</Label>
                    <Input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? '로그인 중...' : '로그인'}
                </Button>

                {message && <p>{message}</p>}
                {error && (
                    <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                </form>
            </CardContent>
        </Card>
    )
}