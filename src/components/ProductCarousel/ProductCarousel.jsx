import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { Images } from '@assets';
import './ProductCarousel.scss';

const ProductCarousel = ({
  title,
  initialItemsToShow = 8,
  mobileItemsToShow = 6,
  maxMobileItemsToShow,
  products = []
}) => {
  const [showAll, setShowAll] = useState(false);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, initialItemsToShow);

  // 手機版邏輯：初始顯示 6 個，點擊後顯示到最大數量（如果有設定）或全部
  const maxMobileItems = maxMobileItemsToShow || products.length;
  const displayedMobileProducts = showMoreMobile
    ? products.slice(0, maxMobileItems)
    : products.slice(0, mobileItemsToShow);

  // 是否需要顯示手機版的「查看更多」按鈕
  const shouldShowMobileButton = products.length > mobileItemsToShow;

  return (
    <section className="product-carousel">
      <div className="product-carousel__container">
        <h2 className="product-carousel__title">{title}</h2>

        {/* Desktop Grid View */}
        <div className="product-carousel__items product-carousel__items--desktop">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>

        {/* Mobile Swiper View */}
        <div className="product-carousel__items product-carousel__items--mobile">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={15}
            slidesPerView="auto"
            freeMode={true}
            className="product-carousel__swiper"
          >
            {displayedMobileProducts.map((product) => (
              <SwiperSlide key={product.id} className="product-carousel__slide">
                <ProductCard
                  title={product.title}
                  price={product.price}
                />
              </SwiperSlide>
            ))}

            {/* Mobile "Show More" Button - 作為最後一個 SwiperSlide */}
            {shouldShowMobileButton && !showMoreMobile && (
              <SwiperSlide className="product-carousel__slide product-carousel__slide--more">
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
              </SwiperSlide>
            )}
          </Swiper>
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
