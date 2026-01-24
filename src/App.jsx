import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from '@context/AppContext';
import ErrorBoundary from '@components/common/ErrorBoundary';
import { routes } from './routes/index.jsx';
import './App.scss';

// Loading fallback component
const LoadingFallback = () => (
  <div className="app-loading">
    <div className="app-loading__spinner"></div>
    <p className="app-loading__text">載入中...</p>
  </div>
);

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
