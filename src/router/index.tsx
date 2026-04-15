import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute, GuestRoute } from '@/components/guards/AuthGuard';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Transaction from '@/pages/Transaction';
import TopUp from '@/pages/TopUp';

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
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/transaction',
        element: <Transaction />,
      },
      {
        path: '/topup',
        element: <TopUp />,
      },
    ],
  },
]);
