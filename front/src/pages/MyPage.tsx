import { useState } from 'react'
import type { User } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';

export function MyPage() {
    const [user, setUser] = useState<User | null>(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchMe = useAuthStore((state)=>state.fetchMe)
    const me = useAuthStore((state) => state.user)

    async function handleClick() {

        setError('')
        setLoading(true)

        try {
            await fetchMe();
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
        <section className="mx-auto flex max-w-md flex-col gap-4">
            <div>
            <h2 className="text-2xl font-semibold text-slate-950">내 정보</h2>
            <p className="mt-1 text-sm text-slate-500">저장된 토큰으로 현재 사용자를 조회한다.</p>
            </div>

            <Button type="button" disabled={loading} onClick={handleClick}> 
                {loading ? '조회 중...' : '내 정보 조회'}
            </Button>

            {user && (
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <p>ID: {user.id}</p>
                <p>Email: {user.email}</p>
            </div>
            )}

            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </section>
    )
}
