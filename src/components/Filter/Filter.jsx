import { useState } from 'react';
import { Images } from '@assets';
import './Filter.scss';

const Filter = ({ selectedFilters, onFilterChange, priceRange, onPriceChange }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const minPrice = 0;
  const maxPrice = 5000;

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


  return (
    <div className="filter">
      <div className="filter__section">
        <button className="filter__section-header" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          <h3 className="filter__section-title">類別</h3>
          <img
            src={Images.caretDownMdIcon}
            alt={isCategoryOpen ? 'Collapse' : 'Expand'}
            className={`filter__section-icon ${isCategoryOpen ? 'filter__section-icon--rotated' : ''}`}
          />
        </button>
        {isCategoryOpen && (
          <div className="filter__section-content">
            {categories.map(category => (
              <label key={category.name} className="filter__checkbox-label">
                <div className="filter__radio">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedFilters.category === category.name}
                    onChange={() => onFilterChange('category', category.name)}
                    className="filter__radio-input"
                  />
                  <span className="filter__radio-button"></span>
                </div>
                {`${category.name} (${category.count})`}
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="filter__divider" />

      <div className="filter__section">
        <button className="filter__section-header" onClick={() => setIsColorOpen(!isColorOpen)}>
          <h3 className="filter__section-title">顏色</h3>
          <img
            src={Images.caretDownMdIcon}
            alt={isColorOpen ? 'Collapse' : 'Expand'}
            className={`filter__section-icon ${isColorOpen ? 'filter__section-icon--rotated' : ''}`}
          />
        </button>
        {isColorOpen && (
          <div className="filter__section-content">
            {colors.map(color => (
              <label key={color.name} className="filter__checkbox-label">
                <div className="filter__radio">
                  <input
                    type="radio"
                    name="color"
                    checked={selectedFilters.color === color.name}
                    onChange={() => onFilterChange('color', color.name)}
                    className="filter__radio-input"
                  />
                  <span className="filter__radio-button"></span>
                </div>
                {`${color.name} (${color.count})`}
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="filter__divider" />

      <div className="filter__section">
        <button className="filter__section-header" onClick={() => setIsSizeOpen(!isSizeOpen)}>
          <h3 className="filter__section-title">尺寸</h3>
          <img
            src={Images.caretDownMdIcon}
            alt={isSizeOpen ? 'Collapse' : 'Expand'}
            className={`filter__section-icon ${isSizeOpen ? 'filter__section-icon--rotated' : ''}`}
          />
        </button>
        {isSizeOpen && (
          <div className="filter__section-content">
            {sizes.map(size => (
              <label key={size.name} className="filter__checkbox-label">
                <div className="filter__radio">
                  <input
                    type="radio"
                    name="size"
                    checked={selectedFilters.size === size.name}
                    onChange={() => onFilterChange('size', size.name)}
                    className="filter__radio-input"
                  />
                  <span className="filter__radio-button"></span>
                </div>
                {`${size.name} (${size.count})`}
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="filter__divider" />

      <div className="filter__section">
        <button className="filter__section-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
          <h3 className="filter__section-title">價錢</h3>
          <img
            src={Images.caretDownMdIcon}
            alt={isPriceOpen ? 'Collapse' : 'Expand'}
            className={`filter__section-icon ${isPriceOpen ? 'filter__section-icon--rotated' : ''}`}
          />
        </button>
        {isPriceOpen && (
          <div className="filter__section-content">
            <div className="filter__price-slider">
              <div className="filter__price-slider-track">
                <div
                  className="filter__price-slider-range"
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
                onChange={(e) => onPriceChange('min', parseInt(e.target.value))}
                className="filter__price-slider-input filter__price-slider-input--min"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={100}
                value={priceRange.max}
                onChange={(e) => onPriceChange('max', parseInt(e.target.value))}
                className="filter__price-slider-input filter__price-slider-input--max"
              />
            </div>
            <div className="filter__price-range">
              價格區間：{priceRange.min}-{priceRange.max}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;