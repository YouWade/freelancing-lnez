import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';
import { Images } from '@assets';

// 需要橘色 Header 樣式的頁面路徑
const ORANGE_HEADER_PATHS = ['/login', '/register', '/sso-login', '/user', '/user/orders', '/cart'];

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);

  // 判斷是否為橘色 Header 頁面
  const isOrangeHeader = ORANGE_HEADER_PATHS.includes(pathname);

  // 動態設置 theme-color
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isOrangeHeader ? '#fb966e' : '#ffffff');
    }
  }, [isOrangeHeader]);

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
      if (!isMenuOpen) return;

      const isInsideDesktopMenu = menuRef.current?.contains(event.target);
      const isInsideMobileMenu = mobileMenuRef.current?.contains(event.target);
      const isInsideButton = buttonRef.current?.contains(event.target);
      console.log(menuRef,mobileMenuRef);

      if (!isInsideDesktopMenu && !isInsideMobileMenu && !isInsideButton) {
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
  
  // 判斷是否使用白色 icon（橘色 Header 頁面或選單開啟時，但手機版選單開啟時除外）
  // 檢測是否為 mobile view (簡單判斷，實際可能需要 resize listener 或 matchMedia)
  // 但由於這裡主要是 render logic，CSS 已經 override 了 color，這裡主要影響 img src
  // 我們需要讓 JS 知道現在是 mobile 並且 menu open -> 使用黑色 icon
  // 由於 RWD 主要由 CSS 控制，這裡我們可以依賴 CSS 隱藏/顯示，或者傳遞正確的 icon
  // 最簡單的方式：如果不是 orangeHeader，在手機版 menu open 時，仍然認為是 false (使用黑色 icon)
  // 但問題是我們沒有 easy access to "isMobile" state in JS without adding listener.
  // 不過，既然 CSS 已經設定了 color: $color-text-dark，SVG fill 會跟隨 currentColor (如果是 SVG)
  // 但圖像是 img src，所以必須選對圖片
  
  // 邏輯修正：
  // Desktop Menu Open -> Orange BG -> White Icons
  // Mobile Menu Open -> White BG -> Black Icons
  // Orange Header Page -> Orange BG -> White Icons (Both Desktop & Mobile usually, but Mobile hides header in orange pages? No, Mobile hides header--orange via display:none)
  
  // 所以重點是 Homepage (White BG) -> Open Menu
  // Desktop: 變橘色 -> White Icons
  // Mobile: 維持白色 -> Black Icons
  
  // 我們可以使用 window.innerWidth 但這在 SSR 或 resize 時有問題。
  // 不過通常 React 元件 mount 後可以 check。
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 與 SCSS md-min 768px 一致
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const useWhiteIcons = isOrangeHeader || (isMenuOpen && !isMobile);

  // 組合 header class
  const headerClasses = [
    'header',
    isMenuOpen ? 'header--menu-open' : '',
    isOrangeHeader ? 'header--orange' : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="header__container">
        <button
          ref={buttonRef}
          className="header__menu-btn"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="header__menu-icon header__menu-icon--close">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="header__menu-icon">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        <div className="header__logo">
          <div className="header__logo-placeholder"></div>
        </div>

        <nav className="header__nav">
          <button className="header__icon-btn" aria-label="Search">
            <img src={useWhiteIcons ? Images.searchWhite : Images.search} alt="Search" />
          </button>

          <button 
            className="header__icon-btn" 
            aria-label="Shopping Cart"
            onClick={() => navigate('/cart')}
          >
            <img src={useWhiteIcons ? Images.shoppingCartWhite : Images.cart} alt="Shopping Cart" />
          </button>

          <button 
            className="header__icon-btn" 
            aria-label="User Account"
            onClick={() => navigate('/user')}
          >
            <img src={useWhiteIcons ? Images.userWhite : Images.user} alt="User Account" />
          </button>
        </nav>
      </div>

      {/* 選單遮罩 - 僅桌面版 */}
      <div
        className={`header__overlay ${isMenuOpen ? 'header__overlay--active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 桌面版 Mega Menu */}
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

      {/* 手機版 Mobile Menu - Drop Down */}
      <nav
        ref={mobileMenuRef}
        className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--active' : ''}`}
      >
        {/* 分類 Tabs */}
        <div className="header__mobile-menu-tabs">
          {menuCategories.map((category, index) => (
            <button
              key={index}
              className={`header__mobile-menu-tab ${activeCategory === index ? 'header__mobile-menu-tab--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory(index);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* 子項目列表 */}
        <ul className="header__mobile-menu-list">
          {menuCategories[activeCategory].items.map((item, index) => (
            <li key={index} className="header__mobile-menu-item">
              <a
                href="#"
                className="header__mobile-menu-link"
                onClick={(e) => e.stopPropagation()}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
