import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth = () => {
	const location = useLocation();
	const { auth } = useAuth();
	return auth && auth.token ? <Outlet /> : <Navigate to={'/auth'} state={{ from: location }} />;
};
