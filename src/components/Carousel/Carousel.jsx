import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import './Carousel.scss';

/**
 * 通用 Carousel 組件
 * 使用 Swiper 提供頻滑動功能
 *
 * @param {Object} props
 * @param {Array} props.items - 要顯示的項目陣列
 * @param {React.ReactNode} props.children - 用於渲染每個 item 的 render function: (item, index) => ReactNode
 * @param {number} [props.spaceBetween=15] - slides 之間的間距（像素）
 * @param {string|number} [props.slidesPerView='auto'] - 一次顯示的 slides 數量
 * @param {boolean} [props.freeMode=true] - 是否啟用自由模式
 * @param {string} [props.className=''] - 自定義 CSS class
 */
const Carousel = ({
  items = [],
  children,
  spaceBetween = 15,
  slidesPerView = 'auto',
  freeMode = true,
  className = '',
}) => {
  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      freeMode={freeMode}
      className={`carousel ${className}`}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="carousel__slide">
          {children(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
