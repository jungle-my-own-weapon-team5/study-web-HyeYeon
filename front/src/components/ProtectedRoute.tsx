import { getToken } from "../api/token"
import { Navigate } from "react-router-dom"

type ProtectedRouteProps = {
    children: React.ReactNode
}

export function ProtectedRoute( {children} : ProtectedRouteProps) {
    const token = getToken()

    if(!token){
        return <Navigate to="/login" replace/>
    }

    return children
}