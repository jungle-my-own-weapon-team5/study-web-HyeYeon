import { useState, type FormEvent } from 'react'
import type { User } from '../types/auth'
import {getMe} from '../api/client'

export function MyPage() {
    const [user, setUser] = useState<User | null>(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleClick() {

        setError('')
        setLoading(true)

        try {
            const me = await getMe();
            setUser(me);
        }
        catch (error){
            setError(error instanceof Error ? 
                error.message : '내 정보 조회에 실패했습니다.')
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <section>
        <h1>내 정보</h1>
        <button type="button" onClick={handleClick} disabled={loading}>
            {loading ? '조회 중...' : '내 정보 조회'}
      </button>

      {user && (
        <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </section>
  )
}