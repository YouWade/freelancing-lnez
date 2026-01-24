import { lazy } from 'react';

// Lazy load pages for better performance
const Layout = lazy(() => import('../pages/Layout/Layout'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ErrorPage = lazy(() => import('../pages/Error/Error'));
const AuthPage = lazy(() => import('../pages/Auth/AuthPage'));
const UserPage = lazy(() => import('../pages/User/UserPage'));
const UserOrderPage = lazy(() => import('../pages/User/UserOrderPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const PaymentPage = lazy(() => import('../pages/Payment/PaymentPage'));
const OrderCompletePage = lazy(() => import('../pages/OrderComplete/OrderCompletePage'));
const SearchPage = lazy(() => import('../pages/Search/SearchPage'));

/**
 * 應用程式路由配置
 */
export const routes = [
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
            // 登入、註冊、第三方,都共用 AuthPage 元件
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
];
