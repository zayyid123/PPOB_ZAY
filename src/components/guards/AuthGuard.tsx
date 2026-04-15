import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

// redirect to /login if the user is not authenticated
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// redirect to / (home) if the user is already authenticated.
export function GuestRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
