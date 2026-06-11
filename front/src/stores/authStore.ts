import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getMe} from '@/api/client'

import type { User } from '@/types/auth'

type AuthState = {
    accessToken: string | null
    user: User | null
    isAuthenticated: boolean
    setToken: (token: string) => void
    setUser: (user: User) => void
    fetchMe: ()=>Promise<void>
    logout: ()=>void
}

export const useAuthStore  = create<AuthState>()( 

    //새로고침 후에도 로그인 상태를 유지하려면 localStorage에 저장 => persist
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            isAuthenticated: false,
        setToken: (token) => set({ accessToken: token, isAuthenticated: true }),
            setUser: (user) => set({ user }),
            fetchMe: async () => {
                const user = await getMe()
                set({ user, isAuthenticated: true })
            },
            logout: () => set({ accessToken: null, user: null, isAuthenticated: false }),
        }),
        {
            // name은 localStorage에 저장될 key 이름
            name: 'auth-storage',
        },
    ),
)