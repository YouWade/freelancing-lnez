import HeroBanner from '@components/HeroBanner/HeroBanner';
import ProductCarousel from '@components/common/ProductCarousel/ProductCarousel';
import ProductCard from '@components/ProductCard/ProductCard';
import { PRODUCTS_DATA } from '@data';
import './HomePage.scss';

const HomePage = () => {
  // TODO: 未來可改用 API 獲取暢銷和新品資料
  // const { data: bestSellers } = useProducts({ isBestSeller: true, limit: 8 });
  // const { data: newArrivals } = useProducts({ isNewArrival: true, limit: 8 });

  // 目前使用 mock data 篩選
  const bestSellerProducts = PRODUCTS_DATA.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivalProducts = PRODUCTS_DATA.filter(p => p.isNewArrival).slice(0, 8);

  return (
    <div className="home-page">
      <HeroBanner />

      {/* 熱銷排行榜 */}
      <ProductCarousel
        title="熱銷排行榜"
        initialItemsToShow={8}
        items={bestSellerProducts}
        renderItem={(item) => (
          <ProductCard
            key={item.id}
            title={item.name}
            price={`$${item.price}`}
            image={item.image}
          />
        )}
      />

      {/* 新品上架 */}
      <ProductCarousel
        title="新品上架"
        initialItemsToShow={8}
        items={newArrivalProducts}
        renderItem={(item) => (
          <ProductCard
            key={item.id}
            title={item.name}
            price={`$${item.price}`}
            image={item.image}
          />
        )}
      />
    </div>
  );
};

export default HomePage;
