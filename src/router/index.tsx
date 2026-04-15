import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute, GuestRoute } from '@/components/guards/AuthGuard';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import HomePage from '@/pages/Home';

export const router = createBrowserRouter([
  {
    // without auth
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    // with auth
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);
