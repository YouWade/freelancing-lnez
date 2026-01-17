import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, HomePage, ErrorPage, AuthPage, UserPage, UserOrderPage } from './pages';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // 首頁
      {
        index: true,
        element: <HomePage />,
      },
      // 登入、註冊、第三方，都共用 AuthPage 元件
      {
        path: 'login',
        element: <AuthPage />,
      },
      {
        path: 'register',
        element: <AuthPage />,
      },
      {
        path: 'sso-login',
        element: <AuthPage />,
      },
      // User基本資料
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'user/orders',
        element: <UserOrderPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
