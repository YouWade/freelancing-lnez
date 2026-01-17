import { Outlet, useLocation } from 'react-router-dom';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import './Layout.scss';

// 不顯示 Footer 的頁面路徑
const HIDE_FOOTER_PATHS = ['/login', '/register', '/sso-login'];

const Layout = () => {
  const { pathname } = useLocation();
  const showFooter = !HIDE_FOOTER_PATHS.includes(pathname);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
