import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function ProtectedRoute({ children, redirectPath = '/auth/login' }) {
    const isAuthenticated = !!Cookies.get('_tk')

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default ProtectedRoute
