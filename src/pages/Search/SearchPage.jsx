import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Filter from '@components/Filter/Filter';
import ProductCard from '@components/ProductCard/ProductCard';
import { PRODUCTS_DATA, PRICE_RANGE } from '@data';
import { Images } from '@assets';
import './SearchPage.scss';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const searchInputRef = useRef(null);

  // 手機版篩選下拉狀態
  const [activeMobileFilter, setActiveMobileFilter] = useState(null);

  // 響應式偵測
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 篩選狀態
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    color: null,
    size: null,
    priceMin: PRICE_RANGE.DEFAULT_MIN,
    priceMax: PRICE_RANGE.DEFAULT_MAX,
  });

  // 產品加載狀態
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [hasMore, setHasMore] = useState(true);

  // 使用 useCallback 和 debounce 優化 resize 處理
  useEffect(() => {
    let timeoutId;

    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      // 只在實際改變時更新 state
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

  // 處理搜尋提交
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery.trim())}`);
    }
  };

  // 處理搜尋輸入 Enter 鍵
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  // 切換手機版篩選下拉
  const toggleMobileFilter = (filterName) => {
    setActiveMobileFilter(activeMobileFilter === filterName ? null : filterName);
  };

  // 返回上一頁
  const handleBack = () => {
    navigate(-1);
  };

  // 手機版篩選選項
  const mobileFilters = [
    { key: 'category', label: '類別' },
    { key: 'color', label: '顏色' },
    { key: 'size', label: '尺寸' },
    { key: 'price', label: '價錢' },
  ];

  // 篩選資料（移除預設選擇）
  const categories = [
    { name: '寬鬆西裝外套', count: 50 },
    { name: '緊身西裝外套', count: 50 },
    { name: '休閒西裝外套', count: 50 },
    { name: '正式西裝外套', count: 50 },
    { name: '長版西裝外套', count: 50 },
  ];

  const colors = [
    { name: '黑色', count: 30 },
    { name: '白色', count: 25 },
    { name: '灰色', count: 20 },
    { name: '藍色', count: 15 },
  ];

  const sizes = [
    { name: 'XS', count: 10 },
    { name: 'S', count: 20 },
    { name: 'M', count: 30 },
    { name: 'L', count: 25 },
    { name: 'XL', count: 15 },
  ];

  // 價格範圍狀態 - 使用 PRICE_RANGE 常量初始化
  const [priceRange, setPriceRange] = useState({
    min: PRICE_RANGE.DEFAULT_MIN,
    max: PRICE_RANGE.DEFAULT_MAX
  });
  const minPrice = PRICE_RANGE.MIN;
  const maxPrice = PRICE_RANGE.MAX;

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      min: Math.min(value, prev.max)
    }));
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      max: Math.max(value, prev.min)
    }));
  };

  // 處理篩選變更
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // 重置頁碼
  };

  // 處理價格範圍變更
  const handlePriceChange = (type, value) => {
    if (type === 'min') {
      setPriceRange(prev => ({
        ...prev,
        min: Math.min(value, prev.max)
      }));
    } else {
      setPriceRange(prev => ({
        ...prev,
        max: Math.max(value, prev.min)
      }));
    }
    setCurrentPage(1); // 重置頁碼
  };

  // 過濾產品
  const filterProducts = () => {
    let filtered = [...PRODUCTS_DATA];

    // 根據類別篩選
    if (selectedFilters.category) {
      filtered = filtered.filter(p => p.category === selectedFilters.category);
    }

    // 根據顏色篩選
    if (selectedFilters.color) {
      filtered = filtered.filter(p => p.colors && p.colors.includes(selectedFilters.color));
    }

    // 根據尺寸篩選
    if (selectedFilters.size) {
      filtered = filtered.filter(p => p.sizes && p.sizes.includes(selectedFilters.size));
    }

    // 根據價格篩選（價格篩選始終存在）
    filtered = filtered.filter(p => {
      const price = p.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    return filtered;
  };

  // 模擬 API 加載
  const loadProducts = async (page) => {
    setIsLoading(true);

    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 800));

    const filtered = filterProducts();
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = filtered.slice(startIndex, endIndex);

    if (page === 1) {
      setDisplayedProducts(newProducts);
    } else {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
    }

    setHasMore(endIndex < filtered.length);
    setIsLoading(false);
  };

  // 當篩選條件變更時重新加載產品
  useEffect(() => {
    loadProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, priceRange, currentPage]);

  // 初始加載
  useEffect(() => {
    loadProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 無限滾動處理
  const handleScroll = () => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore]);

  return (
    <div className="search-page">
      {/* 手機版搜尋列 */}
      {isMobile && (
        <div className="search-page__mobile-header">
          <button
            className="search-page__back-btn"
            onClick={handleBack}
            aria-label="返回"
          >
            <img src={Images.chevronLeftIcon} alt="" />
          </button>
          <div className="search-page__mobile-search-bar">
            <input
              ref={searchInputRef}
              type="text"
              className="search-page__mobile-search-input"
              placeholder="搜尋商品..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button className="search-page__mobile-camera-btn" aria-label="相機搜尋">
              <img src={Images.cameraIcon} alt="" />
            </button>
            <button
              className="search-page__mobile-search-submit"
              onClick={handleSearchSubmit}
              aria-label="搜尋"
            >
              <img src={Images.search} alt="" />
            </button>
          </div>
        </div>
      )}

      {/* 手機版分類篩選 */}
      {isMobile && (
        <>
          <div className="search-page__mobile-filters">
            {mobileFilters.map((filter) => (
              <button
                key={filter.key}
                className={`search-page__mobile-filter-btn ${activeMobileFilter === filter.key ? 'search-page__mobile-filter-btn--active' : ''}`}
                onClick={() => toggleMobileFilter(filter.key)}
              >
                <span>{filter.label}</span>
                <img
                  src={Images.caretDownMdIcon}
                  alt=""
                  className={`search-page__mobile-filter-icon ${activeMobileFilter === filter.key ? 'search-page__mobile-filter-icon--rotated' : ''}`}
                />
              </button>
            ))}
          </div>

          {/* 手機版篩選遮罩 */}
          {activeMobileFilter && (
            <div
              className="search-page__mobile-filter-overlay"
              onClick={() => setActiveMobileFilter(null)}
            />
          )}

          {/* 手機版篩選內容下拉 */}
          {activeMobileFilter && (
            <div className="search-page__mobile-filter-dropdown">
              {/* 類別篩選 */}
              {activeMobileFilter === 'category' && (
                <div className="search-page__mobile-filter-content">
                  {categories.map((category) => (
                    <label key={category.name} className="search-page__mobile-filter-option">
                      <div className="search-page__mobile-filter-radio">
                        <input
                          type="radio"
                          name="mobile-category"
                          checked={selectedFilters.category === category.name}
                          onChange={() => handleFilterChange('category', category.name)}
                          className="search-page__mobile-filter-radio-input"
                        />
                        <span className="search-page__mobile-filter-radio-button"></span>
                      </div>
                      {`${category.name} (${category.count})`}
                    </label>
                  ))}
                </div>
              )}

              {/* 顏色篩選 */}
              {activeMobileFilter === 'color' && (
                <div className="search-page__mobile-filter-content">
                  {colors.map((color) => (
                    <label key={color.name} className="search-page__mobile-filter-option">
                      <div className="search-page__mobile-filter-radio">
                        <input
                          type="radio"
                          name="mobile-color"
                          checked={selectedFilters.color === color.name}
                          onChange={() => handleFilterChange('color', color.name)}
                          className="search-page__mobile-filter-radio-input"
                        />
                        <span className="search-page__mobile-filter-radio-button"></span>
                      </div>
                      {`${color.name} (${color.count})`}
                    </label>
                  ))}
                </div>
              )}

              {/* 尺寸篩選 */}
              {activeMobileFilter === 'size' && (
                <div className="search-page__mobile-filter-content">
                  {sizes.map((size) => (
                    <label key={size.name} className="search-page__mobile-filter-option">
                      <div className="search-page__mobile-filter-radio">
                        <input
                          type="radio"
                          name="mobile-size"
                          checked={selectedFilters.size === size.name}
                          onChange={() => handleFilterChange('size', size.name)}
                          className="search-page__mobile-filter-radio-input"
                        />
                        <span className="search-page__mobile-filter-radio-button"></span>
                      </div>
                      {`${size.name} (${size.count})`}
                    </label>
                  ))}
                </div>
              )}

              {/* 價格篩選 */}
              {activeMobileFilter === 'price' && (
                <div className="search-page__mobile-filter-content">
                  <div className="search-page__mobile-price-slider">
                    <div className="search-page__mobile-price-slider-track">
                      <div
                        className="search-page__mobile-price-slider-range"
                        style={{
                          left: `${(priceRange.min / maxPrice) * 100}%`,
                          right: `${100 - (priceRange.max / maxPrice) * 100}%`
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      step={100}
                      value={priceRange.min}
                      onChange={handleMinPriceChange}
                      className="search-page__mobile-price-slider-input search-page__mobile-price-slider-input--min"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      step={100}
                      value={priceRange.max}
                      onChange={handleMaxPriceChange}
                      className="search-page__mobile-price-slider-input search-page__mobile-price-slider-input--max"
                    />
                  </div>
                  <div className="search-page__mobile-price-range">
                    價格區間：{priceRange.min}-{priceRange.max}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="search-page__container">
        {/* 桌面版篩選器 */}
        {!isMobile && (
          <div className="search-page__filter">
            <Filter
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
            />
          </div>
        )}

        <div className="search-page__content">
          {displayedProducts.length === 0 && !isLoading ? (
            <div className="search-page__no-results">
              <p>沒有找到符合條件的商品</p>
            </div>
          ) : (
            <>
              <div className="search-page__products">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.name}
                    price={`$${product.price}`}
                    image={product.image}
                    badge={product.isBestSeller ? '最暢銷' : null}
                  />
                ))}
              </div>

              {/* 加載動畫 */}
              {isLoading && (
                <div className="search-page__loading">
                  <div className="search-page__loading-spinner"></div>
                  <p>載入中...</p>
                </div>
              )}

              {/* 已加載所有產品 */}
              {!isLoading && !hasMore && displayedProducts.length > 0 && (
                <div className="search-page__end-message">
                  <p>已顯示所有商品</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;