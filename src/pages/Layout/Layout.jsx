import { Outlet, useLocation } from 'react-router-dom';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import './Layout.scss';

// 不顯示 Footer 的頁面路徑
const HIDE_FOOTER_PATHS = ['/login', '/register', '/sso-login'];

// 手機版不顯示 Header 的頁面路徑
const HIDE_MOBILE_HEADER_PATHS = ['/search'];

const Layout = () => {
  const { pathname } = useLocation();
  const showFooter = !HIDE_FOOTER_PATHS.includes(pathname);
  const isMobileNotShowSection = pathname.startsWith('/user');
  const hideMobileHeader = HIDE_MOBILE_HEADER_PATHS.includes(pathname);

  return (
    <div className={`layout ${isMobileNotShowSection ? 'layout--user' : ''} ${hideMobileHeader ? 'layout--hide-mobile-header' : ''}`}>
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
