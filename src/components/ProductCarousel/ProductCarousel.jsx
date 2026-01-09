import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import ProductCard from '../ProductCard/ProductCard';
import { Images } from '@assets';
import './ProductCarousel.scss';

const ProductCarousel = ({ title, initialItemsToShow = 8, products = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, initialItemsToShow);

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
            spaceBetween={16}
            slidesPerView="auto"
            freeMode={true}
            className="product-carousel__swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="product-carousel__slide">
                <ProductCard
                  title={product.title}
                  price={product.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Toggle Button */}
        <div className="product-carousel__actions">
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
