import './Header.scss';
import { Images } from '@assets';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <button className="header__menu-btn" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="header__logo">
          <div className="header__logo-placeholder"></div>
        </div>

        <nav className="header__nav">
          <button className="header__icon-btn" aria-label="Search">
            <img src={Images.search} alt="Icon" />
          </button>

          <button className="header__icon-btn" aria-label="Shopping Cart">
            <img src={Images.cart} alt="Shopping Cart" />
          </button>

          <button className="header__icon-btn" aria-label="User Account">
            <img src={Images.user} alt="User Account" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
