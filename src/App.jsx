import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, Layout, Error } from './pages';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // 未來可以在這裡添加更多路由
      // {
      //   path: 'products',
      //   element: <ProductsPage />,
      // },
      // {
      //   path: 'products/:id',
      //   element: <ProductDetailPage />,
      //   loader: productLoader,
      // },
      // {
      //   path: 'about',
      //   element: <AboutPage />,
      // },
      // {
      //   path: 'contact',
      //   element: <ContactPage />,
      // },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
