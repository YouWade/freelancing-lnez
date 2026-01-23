import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from '@context/AppContext';
import {
  Layout,
  HomePage,
  ErrorPage,
  AuthPage,
  UserPage,
  UserOrderPage,
  CartPage,
  PaymentPage,
  OrderCompletePage,
  SearchPage
} from './pages';

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
      // 購物車
      {
        path: 'cart',
        element: <CartPage />,
      },
      // 付款頁面
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      // 訂單完成頁面
      {
        path: 'order-complete',
        element: <OrderCompletePage />,
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
      // Search Page
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
