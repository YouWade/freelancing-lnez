import { useState } from 'react';
import Carousel from '../../Carousel/Carousel';
import { Images } from '@assets';
import './ProductCarousel.scss';

const ProductCarousel = ({
  title,
  initialItemsToShow = 8,
  mobileItemsToShow = 6,
  maxMobileItemsToShow,
  items = [],
  renderItem
}) => {
  const [showAll, setShowAll] = useState(false);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialItemsToShow);

  // 手機版邏輯：初始顯示 6 個，點擊後顯示到最大數量（如果有設定）或全部
  const maxMobileItems = maxMobileItemsToShow || items.length;
  const displayedMobileItems = showMoreMobile
    ? items.slice(0, maxMobileItems)
    : items.slice(0, mobileItemsToShow);

  // 是否需要顯示手機版的「查看更多」按鈕
  const shouldShowMobileButton = items.length > mobileItemsToShow;

  return (
    <section className="product-carousel">
      <div className="product-carousel__container">
        <h2 className="product-carousel__title">{title}</h2>

        {/* Desktop Grid View */}
        <div className="product-carousel__items product-carousel__items--desktop">
          {displayedItems.map((item) => renderItem(item))}
        </div>

        {/* Mobile Swiper View */}
        <div className="product-carousel__items product-carousel__items--mobile">
          <Carousel
            items={displayedMobileItems}
            spaceBetween={15}
            className="product-carousel__swiper"
            moreButton={
              shouldShowMobileButton && !showMoreMobile ? (
                <button
                  className="product-carousel__more-button"
                  onClick={() => setShowMoreMobile(true)}
                  aria-label="Show more products"
                >
                  <img
                    src={Images.chevronRight}
                    alt="Show more"
                    className="product-carousel__more-icon"
                  />
                </button>
              ) : null
            }
          >
            {(item) => renderItem(item)}
          </Carousel>
        </div>

        {/* Desktop Toggle Button */}
        <div className="product-carousel__actions product-carousel__actions--desktop">
          <button
            className="product-carousel__toggle"
            onClick={() => setShowAll(!showAll)}
            aria-label={showAll ? 'Show less' : 'Show more'}
          >
            <img
              src={Images.chevronDown}
              alt={showAll ? 'Show less' : 'Show more'}
              className={`product-carousel__icon ${showAll ? 'product-carousel__icon--rotated' : ''}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
