import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Images } from '@assets';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroBanner.scss';

const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 背景圖片輪播數據
  const backgroundImages = [
    {
      id: 1,
      desktopImage: Images.heroBanner,
      mobileImage: Images.heroMobileBanner,
      fallbackDesktop: Images.defaultBanner,
      fallbackMobile: Images.defaultMobileBanner,
    },
    {
      id: 2,
      desktopImage: Images.heroBanner,
      mobileImage: Images.heroMobileBanner,
      fallbackDesktop: Images.defaultBanner,
      fallbackMobile: Images.defaultMobileBanner,
    },
    {
      id: 3,
      desktopImage: Images.heroBanner,
      mobileImage: Images.heroMobileBanner,
      fallbackDesktop: Images.defaultBanner,
      fallbackMobile: Images.defaultMobileBanner,
    },
    {
      id: 4,
      desktopImage: Images.heroBanner,
      mobileImage: Images.heroMobileBanner,
      fallbackDesktop: Images.defaultBanner,
      fallbackMobile: Images.defaultMobileBanner,
    },
    {
      id: 5,
      desktopImage: 'invalid_path.png', // 故意給錯誤路徑測試 fallback
      mobileImage: 'invalid_mobile_path.png',
      fallbackDesktop: Images.defaultBanner,
      fallbackMobile: Images.defaultMobileBanner,
    }
  ];

  const handleImageError = (e, fallbackImage) => {
    e.target.src = fallbackImage;
  };

  return (
    <section className="hero">
      {/* 背景圖片 Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: '.hero__pagination'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        dir="ltr"
        loop={true}
        speed={1000}
        className="hero__background-swiper"
      >
        {backgroundImages.map((background) => (
          <SwiperSlide key={background.id}>
            <div className="hero__background-slide">
              <img
                src={isMobile ? background.mobileImage : background.desktopImage}
                alt={`Hero Banner ${background.id}`}
                onError={(e) => handleImageError(
                  e,
                  isMobile ? background.fallbackMobile : background.fallbackDesktop
                )}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 固定的文字內容 */}
      <div className="hero__content-wrapper">
        <div className="hero__container">
          <div className="hero__content">
            <p className="hero__subtitle">不僅是穿搭</p>
            <h1 className="hero__title">時尚，更是一種生活態度。</h1>
            <button className="hero__cta">了解更多</button>
          </div>
        </div>
      </div>

      {/* 分頁指示器 */}
      <div className="hero__pagination"></div>
    </section>
  );
};

export default HeroBanner;
