import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"

type ProtectedRouteProps = {
    children: React.ReactNode
}

export function ProtectedRoute( {children} : ProtectedRouteProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const accessToken = useAuthStore((state) => state.accessToken)

    if(!isAuthenticated || !accessToken){
        return <Navigate to="/login" replace/>
    }

    return children
}