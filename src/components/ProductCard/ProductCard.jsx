import { memo, useState, useEffect } from 'react';
import './ProductCard.scss';
import { Images } from '@assets';

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 2L6 5M14.5 2L16 5M2 5H18L16.5 15H4.5L2 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="18" r="0.75" fill="currentColor" />
    <circle cx="14" cy="18" r="0.75" fill="currentColor" />
  </svg>
);

const ProductCard = memo(({ title = '女士短版襯衫', price = '$590', image, badge }) => {
  const [imgSrc, setImgSrc] = useState(image || Images.productImageDefault);

  useEffect(() => {
    setImgSrc(image || Images.productImageDefault);
  }, [image]);

  const handleError = () => {
    if (imgSrc !== Images.productImageDefault) {
      setImgSrc(Images.productImageDefault);
    }
  };

  return (
    <article className="product-card">
      <div className="product-card__image">
        {badge ? <span className="product-card__badge">{badge}</span> : null}
        <div className="product-card__image-placeholder">
          <img
            src={imgSrc}
            alt={title}
            onError={handleError}
          />
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">{price}</span>
          <button className="product-card__cart-btn" aria-label="Add to cart">
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
