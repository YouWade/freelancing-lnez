import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import './Carousel.scss';

/**
 * 通用 Carousel 組件
 * 使用 Swiper 提供滑動功能
 *
 * @param {Object} props
 * @param {Array} props.items - 要顯示的項目陣列
 * @param {React.ReactNode} props.children - 用於渲染每個 item 的 render function: (item, index) => ReactNode
 * @param {number} [props.spaceBetween=15] - slides 之間的間距（像素）
 * @param {string|number} [props.slidesPerView='auto'] - 一次顯示的 slides 數量
 * @param {boolean} [props.freeMode=true] - 是否啟用自由模式
 * @param {boolean} [props.showNavigation=false] - 是否顯示導航箭頭
 * @param {React.ReactNode} [props.moreButton] - 更多按鈕的內容，如果提供則在最後新增一個 slide
 * @param {string} [props.className=''] - 自定義 CSS class
 */
const Carousel = ({
  items = [],
  children,
  spaceBetween = 15,
  slidesPerView = 'auto',
  freeMode = true,
  showNavigation = false,
  moreButton = null,
  className = '',
}) => {
  return (
    <Swiper
      modules={[FreeMode, Navigation]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      freeMode={freeMode}
      navigation={showNavigation}
      className={`carousel ${className}`}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="carousel__slide">
          {children(item, index)}
        </SwiperSlide>
      ))}
      {moreButton && (
        <SwiperSlide className="carousel__slide carousel__slide--button">
          {moreButton}
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default Carousel;
