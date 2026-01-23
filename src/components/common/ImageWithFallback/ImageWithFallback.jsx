import { useState } from 'react';
import { Images } from '@assets';
import './ImageWithFallback.scss';

/**
 * ImageWithFallback 元件
 * 當圖片載入失敗時自動顯示預設圖片
 *
 * @param {Object} props
 * @param {string} props.src - 圖片來源
 * @param {string} props.alt - 圖片替代文字
 * @param {string} props.fallback - 備用圖片（預設為 productDefault）
 * @param {string} props.className - 自定義 class
 * @param {Object} props...rest - 其他 img 屬性
 */
const ImageWithFallback = ({
  src,
  alt = '',
  fallback = Images.productDefault,
  className = '',
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  const handleLoad = () => {
    // 圖片成功載入，重置錯誤狀態
    setHasError(false);
  };

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      className={`image-with-fallback ${className}`}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
};

export default ImageWithFallback;
