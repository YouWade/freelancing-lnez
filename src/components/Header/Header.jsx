import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './Header.scss';
import { Images } from '@assets';

// 需要橘色 Header 樣式的頁面路徑
const ORANGE_HEADER_PATHS = [
  '/login',
  '/register',
  '/sso-login',
  '/user',
  '/user/orders',
  '/cart',
  '/payment',
  '/order-complete'
];

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchBarRef = useRef(null);

  // 判斷是否為橘色 Header 頁面
  const isOrangeHeader = ORANGE_HEADER_PATHS.includes(pathname);

  // 判斷是否在搜尋頁面（搜尋列永久展開且不能收起）
  const isSearchPage = pathname === '/search';

  // 從 URL 讀取搜尋參數並更新狀態
  useEffect(() => {
    if (isSearchPage) {
      const query = searchParams.get('q') || '';
      setSearchQuery(query);
      setIsSearchOpen(true);
    }
  }, [isSearchPage, searchParams]);

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
    // 關閉搜尋列當選單打開
    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  // 處理搜尋圖標點擊
  const handleSearchClick = () => {
    if (isMobile) {
      // 手機版：直接導航到搜尋頁面
      navigate('/search');
    } else {
      // 桌面版
      // 即便是 Search Page，如果目前是關閉的，也要能展開
      if (!isSearchPage || (isSearchPage && !isSearchOpen)) {
        setIsSearchOpen(!isSearchOpen);
        setIsMenuOpen(false);
        // 展開後聚焦輸入框
        if (!isSearchOpen) {
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 300);
        }
      }
    }
  };

  // 處理搜尋提交
  const handleSearchSubmit = (e) => {
    e?.preventDefault();

    // 如果輸入為空，直接跳轉到搜尋頁面（不帶查詢參數）
    if (searchQuery === '') {
      navigate('/search');
    } else {
      // 有輸入內容（包括空格）時，帶著查詢參數跳轉
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }

    // 不在搜尋頁面時才關閉搜尋列
    if (!isSearchPage) {
      setIsSearchOpen(false);
    }
  };

  // 處理搜尋輸入 Enter 鍵
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    } else if (e.key === 'Escape' && !isSearchPage) {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // 點擊外部關閉搜尋列（搜尋頁面除外）
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (!isSearchOpen || isSearchPage) return;

      const isInsideSearchBar = searchBarRef.current?.contains(event.target);
      if (!isInsideSearchBar) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, [isSearchOpen, isSearchPage]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let timeoutId;

    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      // 只在實際改變時更新 state,避免不必要的重新渲染
      setIsMobile(prev => prev !== newIsMobile ? newIsMobile : prev);
    };

    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150); // 150ms debounce
    };

    // 初始檢查
    checkMobile();

    // 添加 debounced resize listener
    window.addEventListener('resize', debouncedCheckMobile);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheckMobile);
    };
  }, []);

  const useWhiteIcons = isOrangeHeader || (isMenuOpen && !isMobile);

  // 組合 header class
  const headerClasses = [
    'header',
    isMenuOpen ? 'header--menu-open' : '',
    isSearchOpen ? 'header--search-open' : '',
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
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="header__menu-icon">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <div
          className="header__logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="header__logo-placeholder"></div>
        </div>

        {/* 桌面版搜尋列 - 在中央位置 */}
        <div
          ref={searchBarRef}
          className={`header__search-bar ${isSearchOpen ? 'header__search-bar--active' : ''}`}
        >
          <input
            ref={searchInputRef}
            type="text"
            className="header__search-input"
            placeholder="寬鬆西裝外套"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <button
            className="header__search-camera"
            aria-label="Camera search"
          >
            <img src={Images.cameraIcon} alt="Camera" />
          </button>
          <button
            className="header__search-submit"
            onClick={handleSearchSubmit}
            aria-label="Submit search"
          >
            <img src={Images.search} alt="Search" />
          </button>
        </div>

        <nav className="header__nav">
          <button
            className="header__icon-btn header__icon-btn--search"
            aria-label="Search"
            onClick={handleSearchClick}
          >
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
