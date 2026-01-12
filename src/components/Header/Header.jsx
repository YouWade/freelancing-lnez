import { useState, useEffect, useRef } from 'react';
import './Header.scss';
import { Images } from '@assets';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // 選單分類資料
  const menuCategories = [
    {
      title: '上衣',
      items: ['T恤', '襯衫', '設計類上衣']
    },
    {
      title: '下身',
      items: ['長褲', '短褲', '裙子', '運身類']
    },
    {
      title: '外套',
      items: ['西裝外套', '針織外套', '抗UV防曬外套']
    }
  ];

  // 產品圖片資料
  const featuredProducts = [
    { id: 1, image: Images.productDefault, badge: '熱銷商品' },
    { id: 2, image: Images.productDefault, badge: null },
    { id: 3, image: Images.productDefault, badge: '熱銷商品' }
  ];

  // 點擊外部關閉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // 防止選單開啟時背景滾動
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isMenuOpen ? 'header--menu-open' : ''}`}>
      <div className="header__container">
        <button
          ref={buttonRef}
          className="header__menu-btn"
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="header__logo">
          <div className="header__logo-placeholder"></div>
        </div>

        <nav className="header__nav">
          <button className="header__icon-btn" aria-label="Search">
            <img src={isMenuOpen ? Images.searchWhite : Images.search} alt="Search" />
          </button>

          <button className="header__icon-btn" aria-label="Shopping Cart">
            <img src={isMenuOpen ? Images.shoppingCartWhite : Images.cart} alt="Shopping Cart" />
          </button>

          <button className="header__icon-btn" aria-label="User Account">
            <img src={isMenuOpen ? Images.userWhite : Images.user} alt="User Account" />
          </button>
        </nav>
      </div>

      {/* 選單遮罩 */}
      <div
        className={`header__overlay ${isMenuOpen ? 'header__overlay--active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 下拉式 Mega Menu */}
      <nav
        ref={menuRef}
        className={`header__mega-menu ${isMenuOpen ? 'header__mega-menu--active' : ''}`}
      >
        <div className="header__mega-menu-container">
          {/* 左側：分類選單 */}
          <div className="header__mega-menu-categories">
            {menuCategories.map((category, index) => (
              <div key={index} className="header__mega-menu-category">
                <h3 className="header__mega-menu-category-title">{category.title}</h3>
                <ul className="header__mega-menu-items">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="header__mega-menu-item">
                      <a href="#" className="header__mega-menu-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 右側：產品圖片 */}
          <div className="header__mega-menu-products">
            {featuredProducts.map((product) => (
              <div key={product.id} className="header__mega-menu-product">
                {product.badge && (
                  <span className="header__mega-menu-product-badge">{product.badge}</span>
                )}
                <img
                  src={product.image}
                  alt="Featured Product"
                  className="header__mega-menu-product-image"
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
